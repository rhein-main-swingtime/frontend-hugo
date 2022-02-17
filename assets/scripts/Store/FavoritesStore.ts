import { DanceEventPayload } from '../Types/EventServerApiTypes'
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'

interface collectionInterface {
    [key: number | string]: DanceEvent
}

export class FavoritesStore {
    collection: collectionInterface
    private storageKey = 'RMST:eventSave'

    constructor () {
        const serialized: {
            [key: string]: DanceEventPayload
        } = JSON.parse(String(window.localStorage.getItem(this.storageKey))) || {}
        this.collection = {}
        for (const [key, value] of Object.entries(serialized)) {
            this.collection[key] = createDanceEventFromJson(value)
        }
    }

    private filterOutdated () {
        const now = (new Date()).getTime() - (31 * 24 * 60 * 60 * 1000) // 31 days in miliseconds
        this.collection = Object.keys(this.collection).filter(
            (k) => {
                return this.collection[k].endDateTime.getTime() > now
            }).reduce((obj: collectionInterface, key) => {
            obj[Number(key)] = this.collection[Number(key)]
            return obj
        }, {})
    }

    private save () {
        this.filterOutdated()
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.collection))
    }

    public toggle (danceEvent: DanceEvent) {
        if (this.isSaved(danceEvent)) {
            this.remove(danceEvent.id)
        } else {
            this.add(danceEvent)
        }
    }

    public remove (id: number) {
        delete this.collection[id]
        this.save()
    }

    public add (danceEvent: DanceEvent) {
        this.collection[danceEvent.id] = danceEvent
        this.save()
    }

    get isSaved () {
        return (danceEvent: DanceEvent) => {
            return Object.keys(this.collection || {}).includes(String(danceEvent.id))
        }
    }

    get savedEvents () {
        return this.collection
    }

    get danceEventIdsInCollection () {
        return Object.keys(this.collection)
    }
}
