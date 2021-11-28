class Day {
    readonly date: Date

    constructor (date: Date) {
        this.date = date
    }

    get dayInMonth () {
        return this.date.getDate()
    }

    get month () {
        return this.date.getMonth()
    }

    get fullYear () {
        return this.date.getFullYear()
    }
}

class CalendarDates {
    year: number
    month: number

    readonly localeFormat: Intl.DateTimeFormat

    constructor (date: Date) {
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.localeFormat = new Intl.DateTimeFormat('de-de', {
            month: 'long',
            year: 'numeric'
        })
    }

    private getNumbers (year: number, month: number, dir: 'forward' | 'back') {
        const modifier = dir === 'forward' ? 1 : -1
        month = month + modifier

        if (month === 0) {
            year = year + modifier
            month = 12
        }

        if (month > 12) {
            year = year + modifier
            month = 1
        }

        return [year, month]
    }

    public back () {
        [this.year, this.month] = this.getNumbers(this.year, this.month, 'back')
        console.log(this.year, this.month)
    }

    public forward () {
        [this.year, this.month] = this.getNumbers(this.year, this.month, 'forward')
        console.log(this.year, this.month)
    }

    get dates () {
        return {
            next: this.getNumbers(this.year, this.month, 'forward'),
            current: [this.year, this.month],
            prev: this.getNumbers(this.year, this.month, 'back')
        }
    }

    get headers () {
        return {
            days: [
                'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'
            ],
            headline: this.localeFormat.format(new Date(this.dates.current[0], this.dates.current[1], 1))
        }
    }

    get calendarCells () {
        const rollingDate = new Date([this.dates.current[0], this.dates.current[1], '01'].join('-'))
        const uppperBound = new Date(rollingDate)

        const day = rollingDate.getDay()
        const diff = rollingDate.getDate() - day + (day === 0 ? -6 : 1)
        rollingDate.setDate(diff)

        uppperBound.setMonth(uppperBound.getMonth() + 1)
        uppperBound.setDate(1)

        const datesInMonth: Day[] = []
        while (
            rollingDate.getTime() < uppperBound.getTime() ||
            [0, 2, 3, 4, 5, 6].includes(rollingDate.getDay())
        ) {
            console.log(rollingDate)
            datesInMonth.push(new Day(new Date(rollingDate)))
            rollingDate.setDate(rollingDate.getDate() + 1)
        }

        return datesInMonth
    }
}

function datesInMonth (fullYear: string | number, month: string | number) {
    const rollingDate = new Date([fullYear, month, '01'].join('-'))
    const rollingMonth = rollingDate.getMonth()

    const day = rollingDate.getDay()
    const diff = rollingDate.getDate() - day + (day === 0 ? -6 : 1)
    rollingDate.setDate(diff)

    const datesInMonth: Day[] = []
    while (
        rollingDate.getMonth() <= rollingMonth ||
        [0, 2, 3, 4, 5, 6].includes(rollingDate.getDay())
    ) {
        datesInMonth.push(new Day(new Date(rollingDate)))
        rollingDate.setDate(rollingDate.getDate() + 1)
    }

    return datesInMonth
}

const today: Day = new Day(new Date())
const focused: Day | null = null
const selectedDays: Day[] = []
const headers = {
    days: [
        'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'
    ]
}
const calendarDates = new CalendarDates(today.date)

export function createPickster () {
    return {
        today,
        focused,
        selectedDays,
        datesInMonth,
        headers,
        calendarDates
    }
}
