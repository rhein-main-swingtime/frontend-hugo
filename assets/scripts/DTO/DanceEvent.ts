import { DanceEventPayload } from '../Types/EventServerApiTypes'

/**
 * This class represents a DanceEvent for use
 * in the frontend. It should remain unmutable
 */
class DanceEvent {
    readonly id: number
    readonly foreignUrl: string
    readonly source: string
    readonly creator: string
    readonly location: string
    readonly city: string
    readonly summary: string
    readonly description: string
    readonly created: Date
    readonly startDateTime: Date
    readonly endDateTime: Date

    /**
     * Constructor
     *
     * @param {Object} payload The payload should always correspond to the api at api.rmswing.de
     */
    constructor (
        payload: DanceEventPayload
    ) {
        this.id = payload.id
        this.foreignUrl = payload.foreignUrl
        this.source = payload.source
        this.creator = payload.creator
        this.location = payload.location
        this.city = payload.city
        this.summary = payload.summary
        this.description = payload.description
        this.created = this.getDateFromVal(payload.created)
        this.startDateTime = this.getDateFromVal(payload.start_date_time)
        this.endDateTime = this.getDateFromVal(payload.end_date_time)
    }

    private getDateFromVal (val: string) {
        return new Date(val)
    }

    private getDateOptions () {
        const options: {[key: string]: string} = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }

        if (this.happensThisYear) {
            options.year = 'numeric'
        }

        return new Intl.DateTimeFormat('de-de', options)
    }

    private getTimeOptions () {
        return new Intl.DateTimeFormat('de-de', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    get happensNow () {
        const nowTime = new Date().getTime()
        return (
            this.startDateTime.getTime() <= nowTime &&
            this.endDateTime.getTime() > nowTime
        )
    }

    get happensToday () {
        const now = new Date()
        return (
            this.startDateTime.getDate() === now.getDate() &&
            this.startDateTime.getMonth() === now.getMonth() &&
            this.startDateTime.getFullYear() === now.getFullYear()
        )
    }

    get happensThisYear () {
        const now = new Date()
        return this.startDateTime.getFullYear() === now.getFullYear()
    }

    private localizeDate (date: Date) {
        if (this.happensNow) {
            return 'Jetzt' // @todo make this dynamic too
        }
        if (this.happensToday) {
            return 'Heute' // @todo and this!
        }

        return this.getDateOptions().format(date)
    }

    get startDateLocalized () {
        return this.localizeDate(this.startDateTime)
    }

    get startTimeLocalized () {
        return this.getTimeOptions().format(this.startDateTime)
    }

    get endTimeLocalized () {
        return this.getTimeOptions().format(this.endDateTime)
    }

    get endDateLocalized () {
        return this.localizeDate(this.endDateTime)
    }
}

export default DanceEvent
