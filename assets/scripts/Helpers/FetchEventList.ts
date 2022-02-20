import { EventServerApiPayload, DanceEventPayload } from './../Types/EventServerApiTypes'
import RMSTApiUrls from '../Settings/RMSTApiUrls'
import { createDanceEventFromJson } from '../DTO/DanceEvent'

interface eventSearchRequestInterface {
    id?: number[] | string[] | number | string
}

function persistResponse (search: string, json: any) {
    sessionStorage.setItem(search, JSON.stringify(json))
}

function getSearchFromCache (search: string) {
    const payload: DanceEventPayload | DanceEventPayload[] = JSON.parse(sessionStorage.getItem(search) || '') || null
    if (payload) {
        try {
            if (Array.isArray(payload)) {
                if (payload.length > 1) {
                    return payload.map((de) => { return createDanceEventFromJson(de) })
                }
                return createDanceEventFromJson(payload[0])
            } else {
                return createDanceEventFromJson(payload)
            }
        } catch {
            sessionStorage.removeItem(search)
        }
    }
    return null
}

export async function fetchEventsById (params: eventSearchRequestInterface) {
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

    const fromCache = getSearchFromCache(url.toString())
    if (fromCache) {
        console.log(fromCache, 'fromCache')
        return fromCache
    }

    return fetch(url.toString())
        .then((response) => response.json())
        .then((r) => {
            persistResponse(url.toString(), r)
            return r
        })
        .then((r: DanceEventPayload[]) => {
            if (r.length < 2) {
                return createDanceEventFromJson(r[0])
            }
            return r.map((de) => { return createDanceEventFromJson(de) })
        }).then(e => {
            console.log(e, 'from api')
            return e
        })
}

export default async function fetchEventList (params: string[] = []) {
    const url = new URL(RMSTApiUrls.eventList)
    let search = window.location.search
    search += (search.includes('?') ? '&' : '?') + params.join('&')

    if (search.length < 2) {
        search = '?category[]=socials'
    }

    url.search = search

    return fetch(url.toString())
        .then((response) => response.json())
        .then((r: EventServerApiPayload) => { return r })
}
