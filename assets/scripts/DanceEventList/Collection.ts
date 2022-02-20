import DanceEvent from '../DTO/DanceEvent'

function genDateKey (e: DanceEvent): string {
    return [
        e.startDateTime.getFullYear(),
        e.startDateTime.getMonth() + 1,
        e.startDateTime.getDate()
    ].map(i => String(i).padStart(2, '0')).join('-')
}

export class Collection {
    public danceEvents: DanceEvent[] = []

    public addEvent (danceEvent: DanceEvent): void {
        this.danceEvents.push(danceEvent)
    }

    public reset (): void {
        this.danceEvents = []
    }

    get count (): number {
        return this.danceEvents.length
    }

    get eventsInDates (): {[key: string]: DanceEvent[]} {
        const out: {[key: string]: DanceEvent[]} = {}

        this.danceEvents.forEach((e) => {
            const key = genDateKey(e)
            if (out[key] === undefined) {
                out[key] = []
            }
            out[key].push(e)
        })

        return out
    }

    findEvent (id: number): null|DanceEvent {
        return this.danceEvents.find((i) => i.id === id) || null
    }
}
