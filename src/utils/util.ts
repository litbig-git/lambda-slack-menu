export function toComma(content: string) {
    return content.replaceAll('\n', ', ')
}

// format as "YYYYMMDD"
export function getDbDate(date: Date): string {
    return date.toLocaleDateString('ko-KR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).replaceAll('. ', '').replaceAll('.', '')
}

// format as "MMM DD, YYYY"
export function getDisplayDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}