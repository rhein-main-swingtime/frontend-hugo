import FetchSharedEvents from '../Helpers/FetchSharedEvents'
import { EventList } from './EventList'
import { Filters } from './Filters'

function updateSearchQuery (search: string): void {
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + search
    window.history.pushState({ path: newurl }, '', newurl)
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
        fetchSharedEvent: FetchSharedEvents
    }
}
