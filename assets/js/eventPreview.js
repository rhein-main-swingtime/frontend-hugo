import fetchEvents from './fetchEvents'
import DanceEvent from './DanceEvent'

export default function (data) {
    const requestData = data
    const now = new Date()
    requestData.options.from = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

    console.log(requestData)

    return {
        isLoading: true,
        events: [],
        fetchPreviewEvents () {
            fetchEvents(requestData).then(
                (data) => {
                    this.events = data.eventCollection.events.map(e => new DanceEvent(e))
                    this.isLoading = false
                }
            )
        }
    }
}
