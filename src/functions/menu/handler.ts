import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import connectionOptions from '@configs/ormconfig'
import { MenuRepository } from "@repository/menu-repository"
import { Block } from './block'
import { getDbDate, getDisplayDate, wordReplace } from '@utils/util'
import { UsageRepository } from '@repository/usage-repository'
import { Usage } from '@entity/usage'

const connection = createConnection(connectionOptions)

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    let date = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
    let bodyMap = new Map<string, string>()
    let when: string

    try {
        if (event.body.hasOwnProperty('text')) {
            when = event.body.text
        } else if (event.hasOwnProperty('body')) {
            `${event.body}`.split('&').forEach(value => {
                let keyValue = value.split('=')
                bodyMap.set(keyValue[0], decodeURI(keyValue[1]))
            })
            if (bodyMap.has('text')) {
                when = bodyMap.get('text')
            } else {
                when = null
            }
        }

        let isTomorrow: boolean
        [when, isTomorrow] = wordReplace(when)
        if (isTomorrow) {
            date.setDate(date.getDate() + 1)
        }

    } catch (error) {
        console.error(error)
        when = null
    }

    console.log(`when: ${when}, date: ${getDbDate(date)}`)

    const menuRepository = (await connection).getCustomRepository(MenuRepository)
    const menu = await menuRepository.getMenuByDate(getDbDate(date))
    console.log(menu)

    const usageRepository = (await connection).getCustomRepository(UsageRepository)
    await usageRepository.setLog(new Usage().parseMap(bodyMap))

    const block = new Block(menu)

    return formatJSONResponse({
        statusCode: 200,
        response_type: 'in_channel',
        blocks: block.getJson(when, getDisplayDate(date)),
        event
    })
}

export const main = middyfy(handler)
