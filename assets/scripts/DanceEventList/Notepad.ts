import { DanceEventPayload } from './../Types/EventServerApiTypes';
import DanceEvent, { createDanceEventFromJson } from '../DTO/DanceEvent'

class Entry {
    public readonly endDate: Date
    public readonly id: number

    constructor (id: number, endDate: Date) {
        this.id = id
        this.endDate = endDate
    }

    get numericDate () {
        return this.endDate.getTime()
    }
}

interface collectionInterface {
    [key: number | string]: DanceEvent
}

export class Notepad {
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

    get savedIds (): string[] {
        return Object.keys(this.collection).map(k => String(k))
    }

    get isSaved () {
        return (event: DanceEvent) => {
            return Object.keys(this.collection || {}).includes(String(event.id))
        }
    }
}
