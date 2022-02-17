
import DanceEvent from '../DTO/DanceEvent'
import FetchEventList from '../Helpers/FetchEventList'
import EventListApiParams from '../Parameter/EventList'

function paramsToString (params: EventListApiParams) {
    const p = []
    for (const [key, val] of Object.entries(params)) {
        if (Array.isArray(val)) {
            val.forEach((v) => {
                p.push(key + '[]=' + v)
            })
        } else {
            p.push(key + '=' + val)
        }
    }
    return p.join('&')
}

export default async function fetchEventTeasers (params: EventListApiParams) {
    const teasers: DanceEvent[] = []
    await FetchEventList([paramsToString(params)]).then(
        (payload) => payload.danceEvents.forEach(
            (danceEvent) => {
                teasers.push(new DanceEvent(danceEvent))
            })
    )
    return teasers
}
