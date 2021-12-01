import { convertStringToDate, getLocalizedDate, getLocalizedTime } from '../Helpers/DateHelper'
import { DanceEventPayload } from '../Types/EventServerApiTypes'

interface DancEventInterface {
    id: number
    foreignUrl: string
    source: string
    creator: string
    location: string
    city: string
    summary: string
    description: string
    created: Date
    startDateTime: Date
    endDateTime: Date
    category: 'class' | 'socials'
}

/**
 * This class represents a DanceEvent for use
 * in the frontend. It should remain unmutable
 */
class DanceEvent implements DancEventInterface {
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
    readonly category: 'class' | 'socials'

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
        this.category = payload.category
        this.created = convertStringToDate(payload.created)
        this.startDateTime = convertStringToDate(payload.start_date_time || payload.startDateTime || '')
        this.endDateTime = convertStringToDate(payload.end_date_time || payload.startDateTime || '')
    }

    get startDateLocalized () {
        return getLocalizedDate(this.startDateTime)
    }

    get startTimeLocalized () {
        return getLocalizedTime(this.startDateTime)
    }

    get endTimeLocalized () {
        return getLocalizedTime(this.endDateTime)
    }

    get endDateLocalized () {
        return getLocalizedDate(this.endDateTime)
    }

    get isSocial () {
        return this.category === 'socials'
    }

    get isClass () {
        return !this.isSocial
    }

    get locationHtml () {
        return this.location.split(', ').join('<br>')
    }

    get mapsLink (): string {
        return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(this.location)
    }

    get isLong (): boolean {
        const long = 12 * 60 * 60 * 1000 // 12hrs in ms
        return this.endDateTime.getTime() - this.startDateTime.getTime() > long
    }
}

export default DanceEvent

export function createDanceEventFromJson (payload: DanceEventPayload): DanceEvent {
    return new DanceEvent(payload)
}
