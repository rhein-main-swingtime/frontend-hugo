import DanceEvent from '../DTO/DanceEvent'
import { fetchEventsBySearch } from '../Helpers/FetchEventList'
import { EventList } from './EventList'
import { Filters } from './Filters'

function updateSearchQuery (search: string): void {
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + search
    window.history.pushState({ path: newurl }, '', newurl)
}

function getSharedEventIdsFromUrl () {
    return window.location.search.split('&')
        .filter(i => i.includes('id'))
        .map(i => parseInt(i.split('=')[1] || ''))
        .filter(i => i > 0)
}

export default function create () {
    const list = new EventList()
    const filters = new Filters()

    return {
        list,
        filters,
        handleFilterChange: async function (value: string, oldValue: string) {
            if (value === oldValue) {
                return
            }
            updateSearchQuery(value)
            this.list.reset()
        },
        handleOpenEventSection (current: string | null, s: string): string | null {
            return current === s
                ? null
                : s
        },
        fetchSharedEvent: async function () {
            let out: DanceEvent[] = []
            for (const id of getSharedEventIdsFromUrl()) {
                out = Array.prototype.concat(out, await fetchEventsBySearch({ id }))
            }
            console.log(out)
            return out || false
        }
    }
}
