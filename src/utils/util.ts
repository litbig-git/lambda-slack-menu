export const dateKorean = (): Date => {
    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    return new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
}

export function toComma(content: string) {
    return content.replace(/\r?\n|\r/g, ', ')
}

type DateType = Date | string | number

const zero = (value: number | string) => value.toString().length === 1 ? `0${value}` : value;

const dateFormater = (format: string, date: DateType = Date.now()): string => {
    const _date = new Date(date) // Date 객체로 만들어줍니다.
    return format.replace(/(yyyy|mm|dd|MM|DD|H|i|s)/g, (t: string): any => {
        switch (t) {
            case "yyyy":
                return _date.getFullYear()
            case "mm":
                return _date.getMonth() + 1
            case "dd":
                return _date.getDate()
            case "MM":
                return zero(_date.getMonth() + 1)
            case "DD":
                return zero(_date.getDate())
            case "H":
                return zero(_date.getHours())
            case "i":
                return zero(_date.getMinutes())
            case "s":
                return zero(_date.getSeconds())
            default:
                return ""
        }
    })
}

// format as "YYYYMMDD"
export function getDbDate(date: Date): string {
    return dateFormater('yyyyMMDD', date)
}

// format as "MMM DD, YYYY"
export function getDisplayDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

// format as "YYYY-MM-DD HH:mm:ss"
export function getDateTimeStamp(date: Date): string {
    return dateFormater('yyyy-MM-DD H:i:s', date)
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

    word = word.replace(/[`~!@#$%^&*()_|+\-=?:'",.<>\{\}\[\]\\\/^\s+$]/gim, '')

    if (word.length == 0) {
        word = 'today'
    }

    return [word, isTomorrow] as const
}

export function parseBody(queryString) {
    let dictionary = {}
    let parts = queryString.split('&')

    parts.forEach((part) => {
        let pair = part.split('=')
        dictionary[pair[0]] = decodeURIComponent(pair[1]).replace(/\+/g, ' ')
    })

    return dictionary
}
