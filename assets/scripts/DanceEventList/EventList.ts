import { EventServerApiPayload } from './../Types/EventServerApiTypes'
import RMSTApiUrls from '../Settings/RMSTApiUrls'
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import { uniq } from 'lodash'

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
    this.showLoader = this.getEventCount() > 0
}

export class EventList {
    public dates: string[] = []
    public eventsInDates: {[key: string]: DanceEvent[]} = {}
    public showLoader: boolean = false;
    public isLoading: boolean = false;

    public addEvent = addEvent
    public getEventsByDate = getEventsByDate
    public getEventCount = getEventCount
    public loadMore = loadMore
    public initialized = false

    public reset () {
        this.dates = []
        this.eventsInDates = {}
        this.init()
        this.showLoader = false
    }

    public async init () {
        console.log('init called')
        this.isLoading = true
        const apiResponse = await fetchEvents()
        this.dates = Object.keys(apiResponse.dates).sort()
        apiResponse.danceEvents.forEach(e => this.addEvent(createDanceEventFromJson(e)))
        this.showLoader = this.getEventCount() > 0
        this.initialized = true
        this.isLoading = false
    }
}
