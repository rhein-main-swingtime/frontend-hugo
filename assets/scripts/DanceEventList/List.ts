import { DanceEventDatesInterface, EventServerApiPayload } from './../Types/EventServerApiTypes'
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import RMSTApiUrls from '../Settings/RMSTApiUrls'

export default () => {
    const storeKey = 'danceEventPage'
    const dateKeys: String[] = []
    const danceEvents: DanceEvent[] = []
    const _dates: DanceEventDatesInterface = {}
    const eventsByDates: {[key: string]: DanceEvent[]} = {}

    const fetchEvents = async () => {
        const url = new URL(RMSTApiUrls.eventList)
        url.search = window.location.search
        return fetch(url.toString())
            .then((response) => response.json())
            .then((r: EventServerApiPayload) => { return r })
    }

    const addEvent = (e: DanceEvent) => {
        const key = [
            e.startDateTime.getFullYear(),
            e.startDateTime.getMonth() + 1,
            e.startDateTime.getDate()
        ].map(i => String(i).padStart(2, '0')).join('-')

        if (this.eventsByDate[key] === undefined) {
            this.eventsByDate[key] = []
        }
        this.eventsByDate[key].push(e)
    }

    const shit = async function () {
        // debugger
        console.log('init called')
        return await this.fetchEvents().then((apiResponse) => {
            console.log(apiResponse)
            // this.dateKeys = Object.keys(apiResponse.dates).sort()
            apiResponse.danceEvents.forEach((e) => { this.addEvent(createDanceEventFromJson(e)) })
            // this._dates = apiResponse.dates
        })
    }

    // function getEventsByDate (key: string): string[] {
    //     const ids = this._dates[key];
    //     return this.danceEvents.filter(i => )
    //     return this._dates[key] || []
    // }

    return {
        addEvent,
        storeKey,
        fetchEvents,
        shit,
        dateKeys,
        danceEvents,
        _dates,
        eventsByDates,
        get dates () {
            return Object.keys(this.eventsByDates).sort()
        }
    }
}

// export class List {
//     private _events: DanceEvent[] = []
//     public _dates: DanceEventDatesInterface = {}
//     public test123: String[] = []

//     constructor () {
//         Alpin.store('test', this.test123)
//     }

//     public async init () {
//         const url = new URL(RMSTApiUrls.eventList)
//         url.search = window.location.search
//         // const response = await fetch(url.toString())
//         this._dates = {}
//         this._events = []

//         // if (!response.ok) {
//         //     const message = `An error has occured: ${response.status}`
//         //     throw new Error(message)
//         // }

//         fetch(url.toString())
//             .then((response) => response.json())
//             .then(
//                 (payload: EventServerApiPayload) => {
//                     const events: DanceEvent[] = []

//                     console.log(payload)
//                     this.test123 = Object.keys(payload.dates)

//                     // payload.danceEvents.forEach((e) => events.push(createDanceEventFromJson(e)))
//                     // this._events = events
//                     // this._dates = payload.dates

//                     // this.test123 = Object.keys(payload.dates)

//                     // Alpine.store('test', payload.dates)

//                     // console.log(this._events)
//                     // console.log(this._dates)
//                 }
//             )
//     }

//     public addEvent (danceEvent: DanceEvent) {
//         this._events[danceEvent.id] = danceEvent
//     }

//     public loadMore () {
//         fetchEventsFromApi({ categories: ['socials'], skip: Object.keys(this.events).length }).then(
//             (payload) => {
//                 this._dates = _.merge(payload.dates, this._dates)
//                 payload.danceEvents.forEach(
//                     (i) => {
//                         this.addEvent(new DanceEvent(i))
//                     }
//                 )
//             }
//         )
//     }

//     public handleFilterChange (val: any, oldval: any) {
//         console.log(val, oldval, 'filterchange')
//     }

//     get events () {
//         return this._events
//         // return this._events.sort((a, b) => {
//         //     return a.startDateTime.getTime() - b.startDateTime.getTime()
//         // })

//         // const active: {[key: string]: string[]} = {}
//         // for (const [key, values] of Object.entries(this.filters)) {
//         //     const activeEntries: string[] = []
//         //     values.forEach(element => {
//         //         if (element.checked) {
//         //             activeEntries.push(element.name)
//         //         }
//         //     })
//         //     if (activeEntries.length) {
//         //         active[key] = activeEntries
//         //     }
//         // }

//         // return this._events.filter((e) => {
//         //     for (const [key, values] of Object.entries(active)) {
//         //         if (values.length > 0) {
//         //             return values.includes(DanceEvent[key as keyof DanceEvent])
//         //         }
//         //     }
//         //     return true
//         // })
//     }

//     get dates () {
//         console.log(Object.keys(this._dates), 'dates')
//         return Object.keys(this._dates)
//     }

//     get eventsByDate () {
//         const out = this.events
//             .reduce((obj: {[key: string]: DanceEvent[]}, item) => {
//                 const key = [
//                     item.startDateTime.getFullYear(),
//                     item.startDateTime.getMonth() + 1,
//                     item.startDateTime.getDate()
//                 ].map(i => String(i).padStart(2, '0')).join('-')

//                 if (obj[key] === undefined) {
//                     obj[key] = []
//                 }

//                 obj[key].push(item)

//                 return obj
//             }, {})

//         console.log(out)
//         return out
//     }

//     get initialized () {
//         return this.dates.length > 0
//     }
// }
