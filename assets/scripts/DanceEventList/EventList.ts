import { EventServerApiPayload } from './../Types/EventServerApiTypes'
import RMSTApiUrls from '../Settings/RMSTApiUrls'
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import { uniq } from 'lodash'
import QRCode from 'qrcode'

async function fetchEvents (params: string[] = []) {
    const url = new URL(RMSTApiUrls.eventList)
    let search = window.location.search
    if (params.length > 0) {
        search += (search.includes('?') ? '&' : '?') + params.join('&')
    }
    url.search = search

    return fetch(url.toString())
        .then((response) => response.json())
        .then((r: EventServerApiPayload) => { return r })
}

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
    const apiResponse = await fetchEvents(['skip=' + this.getEventCount()])
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

    public handleAdditional (current: string | null, s: string): string | null {
        return current === s
            ? null
            : s
    }

    public generateQrCode (danceEvent: DanceEvent, basePage: string) {
        const canvas = document.getElementById('dance-event-qr-' + danceEvent.id)
        const url = window.location.href.split('?')[0] + '?highlight=' + danceEvent.id
        console.log(url)
        QRCode.toCanvas(
            canvas,
            url,
            {
                width: 500,
                height: 'auto'
            },
            function (error: any) {
                if (error) console.error(error)
                console.log('success!')
            }
        )
    }

    get noEventsAvailable () : boolean {
        return this.dates.length === 0
    }

    public async init () {
        this.isLoading = true
        const apiResponse = await fetchEvents()
        this.dates = Object.keys(apiResponse.dates).sort()
        apiResponse.danceEvents.forEach(e => this.addEvent(createDanceEventFromJson(e)))
        this.showLoader = this.getEventCount() > 0
        this.initialized = true
        this.isLoading = false
    }
}
