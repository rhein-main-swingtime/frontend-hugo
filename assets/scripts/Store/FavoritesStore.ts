import { DanceEventPayload } from '../Types/EventServerApiTypes'
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'
import trackEvent from '../Helpers/TrackingHelper'

export class FavoritesStore {
    collection: DanceEvent[] = []
    private storageKey = 'RMST:eventSave'

    constructor () {
        const parsed = JSON.parse(String(window.localStorage.getItem(this.storageKey))) || []
        let serialized: DanceEventPayload[] = []
        if (!Array.isArray(parsed)) {
            serialized = Object.values(serialized)
        }

        serialized.forEach(element => {
            this.collection.push(createDanceEventFromJson(element))
        })
    }

    private filterOutdated () {
        const maxAge = (new Date()).getTime() - (31 * 24 * 60 * 60 * 1000) // 31 days in miliseconds
        this.collection = this.collection.filter(e => {
            return e.endDateTime.getTime() > maxAge
        })
    }

    private save () {
        this.filterOutdated()
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.collection))
    }

    public toggle (danceEvent: DanceEvent) {
        if (this.isSaved(danceEvent)) {
            this.remove(danceEvent.id, danceEvent.summary)
        } else {
            this.add(danceEvent)
        }
    }

    public remove (id: number, name: string) {
        trackEvent({
            category: 'danceEventFavorite',
            action: 'remove',
            name: name,
            value: id
        })
        this.collection = this.collection.filter(e => e.id !== id)
        this.save()
    }

    public add (danceEvent: DanceEvent) {
        trackEvent({
            category: 'danceEventFavorite',
            action: 'add',
            name: danceEvent.summary,
            value: danceEvent.id
        })
        this.collection.push(danceEvent)
        this.save()
    }

    get collectionSorted () {
        return this.collection.sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())
    }

    get isSaved () {
        return (danceEvent: DanceEvent) => {
            return this.collection.find(e => e.id.toString() === danceEvent.id.toString())
        }
    }

    get hasId () {
        return (id: number) => {
            this.collection.map((e) => e.id).includes(id)
        }
    }

    get collectionByDate () {
        return Object.values(this.collection).sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())
    }

    get savedEvents () {
        return this.collection
    }

    get danceEventIdsInCollection () {
        return this.collectionSorted.map(e => e.id)
    }

    get hasFavorites () {
        return this.danceEventIdsInCollection.length > 0
    }
}
