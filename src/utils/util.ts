export function toComma(content: string) {
    return content.replace(/\r?\n|\r/g, ', ')
}

// format as "YYYYMMDD"
export function getDbDate(date: Date): string {
    return date.toLocaleDateString('ko-KR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).replace(/[.|\s]/g, '').trim()
}

// format as "MMM DD, YYYY"
export function getDisplayDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

const today = ['today', '오늘', '금일']
const tomorrow = ['tomorrow', '내일', '명일']
const breakfast = ['아침', '조식']
const lunch = ['점심', '중식']
const dinner = ['저녁', '석식']

export function wordReplace(word: string) {
    let isTomorrow = false
    today.forEach(it => {
        if (word.includes(it)) {
            word = word.replace(it, '')
            return
        }
    })

    tomorrow.forEach(it => {
        if (word.includes(it)) {
            word = word.replace(it, '')
            isTomorrow = true
            return
        }
    })

    breakfast.forEach(it => {
        if (word.includes(it)) {
            word = word.replace(it, 'breakfast')
            return
        }
    })

    lunch.forEach(it => {
        if (word.includes(it)) {
            word = word.replace(it, 'lunch')
            return
        }
    })

    dinner.forEach(it => {
        if (word.includes(it)) {
            word = word.replace(it, 'dinner')
            return
        }
    })

    word = word.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/^\s+$]/gim, '')

    if (word.length == 0) {
        word = 'today'
    }

    return [word, isTomorrow] as const
}
