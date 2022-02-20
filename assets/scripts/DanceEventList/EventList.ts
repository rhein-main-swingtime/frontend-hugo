import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import DanceEventQr from './DanceEventQr'
import FetchEventList from '../Helpers/FetchEventList'
import { elementOffset } from '../Helpers/UiHelpers'
import { convertStringToDate, getLocalizedDate } from '../Helpers/DateHelper'
import { Collection } from './Collection'

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

function removeEvent (this: EventList, id: number) {
    Object.keys(this.eventsInDates).forEach((date) => {
        this.eventsInDates[date] = Object.values(this.eventsInDates[date]).filter((danceEvent) => {
            return danceEvent.id !== id
        })
    })
}

function getEventsByDate (this: EventList, date: string): DanceEvent[] {
    return this.eventsInDates[date] || []
}
export class EventList {
    public readonly fetchLimit = 25
    public preloadersVisible: number = 0
    public state: 'nothing-found' | 'more-available' | 'end-reached' | 'updating' = 'updating'
    public eventsInDates: {[key: string]: DanceEvent[]} = {}
    public additional: string | null = null
    public initialized = false

    private collection: Collection

    constructor (collection: Collection) {
        this.collection = collection
    }

    public generateQrCode (danceEvent: DanceEvent) {
        return DanceEventQr(danceEvent)
    }

    public getEventCount (this: EventList): number {
        let count = 0
        Object.values(this.collection.eventsInDates).forEach((e) => { count += e.length })
        return count
    }

    get isLoading (): boolean {
        return this.preloadersVisible > 0
    }

    getFromCollection (id: number) {
        return this.collection.findEvent(id) || false
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

    get isSorry (): boolean {
        return this.state === 'nothing-found'
    }

    get hasMoreAvailable (): boolean {
        return this.state === 'more-available'
    }

    get hasReachedEnd (): boolean {
        return this.state === 'end-reached'
    }

    public dateFromString (s: string): string {
        return getLocalizedDate(convertStringToDate(s))
    }

    public loadMore () {
        this.handleLoading(['skip=' + this.collection.count])
    }

    private async handleLoading (params: string[] = []) {
        params.push('limit=' + this.fetchLimit)
        this.preloadersVisible = this.fetchLimit

        const apiResponse = await FetchEventList(params) || []
        apiResponse.danceEvents.forEach(
            (e) => {
                this.collection.addEvent(createDanceEventFromJson(e))
                this.preloadersVisible = this.preloadersVisible - 1
            })

        if (this.preloadersVisible === this.fetchLimit) {
            this.state = 'nothing-found'
        } else if (this.preloadersVisible > 0) {
            this.state = 'end-reached'
        } else {
            this.state = 'more-available'
        }

        this.preloadersVisible = 0
    }

    public reset () {
        this.init()
    }

    public async init () {
        if (this.collection.count > 0) {
            this.collection.reset()
        }
        this.preloadersVisible = this.fetchLimit
        this.handleLoading()
        this.initialized = true
    }
}
