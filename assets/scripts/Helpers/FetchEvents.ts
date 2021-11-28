import RMSTApiUrls from '../Settings/RMSTApiUrls'
import { EventServerApiPayload } from '../Types/EventServerApiTypes'
import EventListApiParams from '../Parameter/EventList'

function convertToSearchParams (params: EventListApiParams): string {
    const out = []
    for (const [k, v] of Object.entries(params)) {
        if (Array.isArray(v)) {
            v.forEach((t) => {
                out.push(k + '[]=' + encodeURI(t))
            })
        } else if (v instanceof Date) {
            out.push(k + '=' + v.toString())
        } else {
            out.push(k + '=' + encodeURI(v))
        }
    }
    return out.length > 0 ? '?' + out.join('&') : ''
}

export async function fetchEventsFromApi (params: EventListApiParams): Promise<EventServerApiPayload> {
    const url = new URL(RMSTApiUrls.eventList)
    url.search = convertToSearchParams(params)
    const response = await fetch(url.toString())

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }

    return response.json()
}
