import { createDanceEventFromJson } from '../DTO/DanceEvent'
import { fetchEventsById } from './FetchEventList'

function getSharedEventIdsFromUrl () {
    return window.location.search.replace('?', '').split(':')
        .map(i => parseInt(i))
        .filter(i => i > 0)
}

export default async function () {
    const params = {
        id: getSharedEventIdsFromUrl()
    }
    return await fetchEventsById(params)
}
