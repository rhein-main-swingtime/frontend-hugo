import { EventServerApiPayload, DanceEventPayload } from './../Types/EventServerApiTypes'
import RMSTApiUrls from '../Settings/RMSTApiUrls'
import { createDanceEventFromJson } from '../DTO/DanceEvent'

interface eventSearchRequestInterface {
    id?: number[] | string[] | number | string
    q?: string
}

export function fetchEventsBySearch (params: eventSearchRequestInterface) {
    const url = new URL(RMSTApiUrls.eventSearch)
    const parts = []
    for (const [key, value] of Object.entries(params)) {
        const p = key
        if (Array.isArray(value)) {
            value.forEach((v) => {
                parts.push(p + '[]=' + encodeURIComponent(v))
            })
        } else {
            parts.push(p + '=' + encodeURIComponent(value))
        }
    }
    url.search = (parts.length > 0 ? '?' : '') + parts.join('&')

    return fetch(url.toString())
        .then((response) => response.json())
        .then((r: DanceEventPayload[]) => { return r.map((de) => { return createDanceEventFromJson(de) }) })
}

export default async function fetchEventList (params: string[] = []) {
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
