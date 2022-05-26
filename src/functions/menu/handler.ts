import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import connectionOptions from '@configs/ormconfig'
import { MenuRepository } from "@repository/menu-repository"
import { Menu } from '@entity/menu'
import { WebClient } from '@slack/web-api'

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
}

// 👇️ format as "YYYYMMDD"
// You can tweak formatting easily
function formatDate(date: Date, isTomorrow: boolean = false) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate() + (isTomorrow ? 1 : 0)),
        ].join('')
    )
}

const slack = new WebClient(process.env.SLACK_BOT_TOKEN)

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let menu: Menu

    const when = event.body.menu
    console.log(`when: ${when}`)
    let date = formatDate(new Date())

    switch (when) {
        case '내일':
        case 'tomorrow':
            date = formatDate(new Date(), true)
            break
        case '오늘':
        case 'today':
        default:
            break
    }

    console.log(`date: ${date}`)

    try {
        createConnection(connectionOptions)
            .then(async connection => {
                console.log('connected')
                const repository = connection.getCustomRepository(MenuRepository)
                menu = await repository.getMenuByDate(date)
                console.log(menu)
                await slack.chat.postMessage(
                    {
                        channel: '#개발-slack-bot',
                        text: menu.breakfast

                    }
                )
            }).catch(error => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
    } finally {
        return formatJSONResponse({
            statusCode: 200,
            event,
        });
    }
}

export const main = middyfy(handler)
