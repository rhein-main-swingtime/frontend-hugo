
import DanceEvent from '../DTO/DanceEvent'
import { fetchEventsFromApi } from '../Helpers/FetchEvents'
import EventListApiParams from '../Parameter/EventList'

export default async function fetchEventTeasers (params: EventListApiParams) {
    const teasers: DanceEvent[] = []
    await fetchEventsFromApi(params).then(
        (payload) => payload.danceEvents.forEach(
            (danceEvent) => {
                teasers.push(new DanceEvent(danceEvent))
            })
    )
    return teasers
}
