
const localTimeFormat = new Intl.DateTimeFormat('de-de', {
    hour: '2-digit',
    minute: '2-digit'
})

function getLocalDateFormat (d: Date): Intl.DateTimeFormat {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: undefined
    }

    if (!isCurrentYear(d)) {
        options.year = 'numeric'
    }

    return new Intl.DateTimeFormat('de-de', options)
}

export function convertStringToDate (s: string): Date {
    // This always uses the local time of the visitors system
    const date = new Date(s)
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date
}

export function isCurrentYear (d: Date): boolean {
    const now = new Date()
    return d.getFullYear() === now.getFullYear()
}

export function isToday (d: Date): boolean {
    const now = new Date()
    return d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
}

export function happensNow (d: Date) {
    const nowTime = new Date().getTime()
    return (
        d.getTime() <= nowTime &&
        d.getTime() > nowTime
    )
}

export function happensToday (d: Date) {
    const now = new Date()
    return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
    )
}

export function getLocalizedTime (t: Date): string {
    return localTimeFormat.format(t)
}

export function getLocalizedDate (d: Date): string {
    return getLocalDateFormat(d).format(d)
}
