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

const today = [ 'today', '오늘' ]
const tomorrow = ['tomorrow', '내일']

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let when = event.body.menu != undefined ? event.body.menu : `${event.body}`.split('\r\n')[3]
    let date = new Date()
    
    today.forEach(it => {
        if (when.includes(it)) {
            when = when.replaceAll(it, '').trim()
            return
        }
    })

    tomorrow.forEach(it => {
        if (when.includes(it)) {
            when = when.replaceAll(it, '').trim()
            date.setDate(date.getDate() + 1)
            return
        }
    })

    if (when.length == 0) {
        when = 'today'
    }

    console.log(`when: '${when}', date: ${getDbDate(date)}`)

    const connection = await createConnection(connectionOptions)
    const repository = connection.getCustomRepository(MenuRepository)
    const menu = await repository.getMenuByDate(getDbDate(date))
    console.log(menu)

    const block = new Block(menu)

    return formatJSONResponse({
        statusCode: 200,
        response_type: 'in_channel',
        blocks: block.getJson(when, getDisplayDate(date))
    })
}

export const main = middyfy(handler)
