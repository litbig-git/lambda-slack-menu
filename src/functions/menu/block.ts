import { Menu } from '@entity/menu'

function header(comment: string, date: string) {
    return [
        {
            text: {
                text: comment,
                type: 'plain_text'
            },
            type: 'header'
        },
        {
            type: 'context',
            elements: [
                {
                    type: 'mrkdwn',
                    text: `*${date}*  |  판교세븐벤처밸리`
                }
            ]
        }
    ]
}

function divider() {
    return {
        type: 'divider'
    }
}

function menu(icon: string, when: string, content: string = null) {
    let jsonArray = []
    jsonArray.push(
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:${icon}:  *${when}*`
            }
        }
    )
    if (content != null) {
        jsonArray.push(
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${content.length > 0 ? content : '없음'}`
                }
            }
        )
    }
    return jsonArray
}

export class Block {
    menu: Menu
    constructor(menu: Menu) {
        this.menu = menu.getMenuToComma()
    }

    getJson(when: string, date: string, isHeader: boolean = true) {
        let jsonArray = new Array()
        if (this.menu == undefined || when == null) {
            jsonArray.push(...header('메뉴가 없어요 :(', date))
            return JSON.stringify(jsonArray)
        }

        if (isHeader) {
            jsonArray.push(...header('요청하신 메뉴를 알려드릴게요 :)', date))
        }

        switch (when) {
            case 'breakfast':
                jsonArray.push(divider())
                jsonArray.push(...menu('bread', '아침', this.menu.breakfast))
                break

            case 'lunch':
                jsonArray.push(divider())
                jsonArray.push(...menu('spaghetti', '점심 A코너', this.menu.lunch_a))
                jsonArray.push(...menu('rice', '점심 B코너', this.menu.lunch_b))
                jsonArray.push(...menu('leafy_green', '김치&샐러드', this.menu.lunch_side))
                jsonArray.push(...menu('green_salad', 'SALAD BOX', this.menu.lunch_salad))
                break

            case 'dinner':
                jsonArray.push(divider())
                jsonArray.push(...menu('beer', '저녁', this.menu.dinner))
                break

            case 'today':
                jsonArray.push(...this.getJson('breakfast', date, false))
                jsonArray.push(...this.getJson('lunch', date, false))
                jsonArray.push(...this.getJson('dinner', date, false))
                break

            case null:
            default:
                jsonArray = new Array()
                jsonArray.push(...header('올바른 [when]을 입력해주세요 :(', date))
                jsonArray.push(divider())
                jsonArray.push(...menu('bread', 'breakfast, 아침, 조식'))
                jsonArray.push(...menu('spaghetti', 'lunch, 점심, 중식'))
                jsonArray.push(...menu('beer', 'dinner, 저녁, 석식'))
                jsonArray.push(...menu('pizza', 'today, 오늘'))
                jsonArray.push(...menu('fries', 'tomorrow, 내일'))
                jsonArray.push(...menu('fried_shrimp', 'tomorrow breakfast, 내일 아침'))
                jsonArray.push(...menu('fried_egg', 'tomorrow lunch, 내일 점심'))
                jsonArray.push(...menu('sandwich', 'tomorrow dinner, 내일 저녁'))
                break
        }

        return jsonArray
    }
}