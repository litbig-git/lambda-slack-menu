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