import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import { uniq } from 'lodash'
import DanceEventQr from './DanceEventQr'
import FetchEventList from '../Helpers/FetchEventList'
import { elementOffset } from '../Helpers/UiHelpers'
import { convertStringToDate, getLocalizedDate } from '../Helpers/DateHelper'

function addEvent (this: EventList, e: DanceEvent) {
    const key = [
        e.startDateTime.getFullYear(),
        e.startDateTime.getMonth() + 1,
        e.startDateTime.getDate()
    ].map(i => String(i).padStart(2, '0')).join('-')

    if (this.eventsInDates[key] === undefined) {
        this.eventsInDates[key] = []
    }
    this.eventsInDates[key].push(e)
}

function getEventsByDate (this: EventList, date: string): DanceEvent[] {
    return this.eventsInDates[date] || []
}

function getEventCount (this: EventList): number {
    let count = 0
    Object.values(this.eventsInDates).forEach((e) => { count += e.length })
    return count
}

async function loadMore (this: EventList) {
    const apiResponse = await FetchEventList(['skip=' + this.getEventCount()])
    this.dates = uniq(this.dates.concat(Object.keys(apiResponse.dates)).sort())
    apiResponse.danceEvents.forEach(e => this.addEvent(createDanceEventFromJson(e)))
    this.showLoader = apiResponse.danceEvents.length > 0
}

export class EventList {
    public dates: string[] = []
    public eventsInDates: {[key: string]: DanceEvent[]} = {}
    public showLoader: boolean = false
    public isLoading: boolean = false

    public addEvent = addEvent
    public getEventsByDate = getEventsByDate
    public getEventCount = getEventCount
    public loadMore = loadMore
    public additional: string | null = null
    public initialized = false

    public reset () {
        this.dates = []
        this.eventsInDates = {}
        this.init()
        this.showLoader = false
    }

    public generateQrCode (danceEvent: DanceEvent) {
        return DanceEventQr(danceEvent)
    }

    get noEventsAvailable () : boolean {
        return this.dates.length === 0
    }

    public handleHashNavivation (id: number | string, element: HTMLElement): null | 'more' {
        if (window.location.hash !== '#' + id) {
            return null
        }

        setTimeout(
            () => {
                const offset = elementOffset(element)
                const header = document.getElementById('page-mast-head')
                if (header) {
                    offset.top = offset.top - header.offsetHeight
                }
                window.scrollTo({
                    top: offset.top,
                    behavior: 'smooth'
                })
            }, 250
        )
        return 'more'
    }

    public dateFromString (s: string): string {
        return getLocalizedDate(convertStringToDate(s))
    }

    public async init () {
        this.isLoading = true
        const apiResponse = await FetchEventList()
        this.dates = Object.keys(apiResponse.dates).sort()
        apiResponse.danceEvents.forEach(e => this.addEvent(createDanceEventFromJson(e)))
        this.showLoader = this.getEventCount() > 0
        this.initialized = true
        this.isLoading = false
    }
}
