import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import connectionOptions from '@configs/ormconfig'
import { MenuRepository } from "@repository/menu-repository"
import { Block } from './block'
import { dateKorean, getDbDate, getDisplayDate, parseBody, wordReplace } from '@utils/util'
import { UsageRepository } from '@repository/usage-repository'
import { Usage } from '@entity/usage'

const connection = createConnection(connectionOptions)

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let date = dateKorean()
    let when: string

    try {
        const bodyDict = parseBody(event.body)
        when = bodyDict['text']

        const usageRepository = (await connection).getCustomRepository(UsageRepository)
        await usageRepository.setLog(new Usage().parseDict(date, bodyDict))

        let isTomorrow: boolean
        [when, isTomorrow] = wordReplace(when)
        if (isTomorrow) {
            date.setDate(date.getDate() + 1)
        }
        console.log(`date: ${date}`)

    } catch (error) {
        console.error(error)
        when = null
    }

    console.log(`when: ${when}, date: ${getDbDate(date)}`)

    const menuRepository = (await connection).getCustomRepository(MenuRepository)
    const menu = await menuRepository.getMenuByDate(getDbDate(date))
    console.log(menu)

    const block = new Block(menu)

    return formatJSONResponse({
        statusCode: 200,
        response_type: 'in_channel',
        blocks: block.getJson(when, getDisplayDate(date)),
        event
    })
}

export const main = middyfy(handler)
