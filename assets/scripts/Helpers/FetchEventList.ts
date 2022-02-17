import { EventServerApiPayload, DanceEventPayload } from './../Types/EventServerApiTypes'
import RMSTApiUrls from '../Settings/RMSTApiUrls'
import { createDanceEventFromJson } from '../DTO/DanceEvent'
import { Stores } from '../Settings/Stores'

interface eventSearchRequestInterface {
    id?: number[] | string[] | number | string
    q?: string
}

export async function fetchEventsBySearch (params: eventSearchRequestInterface) {
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

    if (search === '?onlyFavorites=true') {
        const notepad = Alpine.store(Stores.FavoriteStore)
        const ids = Object.keys(notepad.collection).map((i) => {
            return 'id[]=' + i
        })
        search += '&' + ids.join('&')
    } else {
        search += (search.includes('?') ? '&' : '?') + params.join('&')

        if (search.length < 2) {
            search = '?category[]=socials'
        }
    }

    url.search = search

    return fetch(url.toString())
        .then((response) => response.json())
        .then((r: EventServerApiPayload) => { return r })
}
