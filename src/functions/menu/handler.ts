import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import connectionOptions from '@configs/ormconfig'
import { MenuRepository } from "@repository/menu-repository"
import { Block } from './block'
import { getDbDate, getDisplayDate } from '@utils/util'

const today = ['today', '오늘']
const tomorrow = ['tomorrow', '내일']

const connection = createConnection(connectionOptions)

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let when: string
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    let date = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

    try {
        if (event.body.hasOwnProperty('text')) {
            when = event.body.text
        } else if (event.hasOwnProperty('body')) {
            let what = `${event.body}`
            console.log(what.split('text')[1].split('&')[0])
            when = what.split('text')[1].split('&')[0]
        }
        when = when.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim, '')

        console.log(`when: ${when}`)

        today.forEach(it => {
            if (when.includes(it)) {
                when = when.replace(it, '')
                return
            }
        })

        tomorrow.forEach(it => {
            if (when.includes(it)) {
                when = when.replace(it, '')
                date.setDate(date.getDate() + 1)
                return
            }
        })

        if (when.length == 0) {
            when = 'today'
        }
    } catch (error) {
        console.error(error)
        when = null
    }

    console.log(`when: ${when}, date: ${getDbDate(date)}`)

    
    const repository = (await connection).getCustomRepository(MenuRepository)
    const menu = await repository.getMenuByDate(getDbDate(date))
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
