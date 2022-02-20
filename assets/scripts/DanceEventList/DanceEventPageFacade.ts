import FetchSharedEvents from '../Helpers/FetchSharedEvents'
import { EventList } from './EventList'
import { Filters } from './Filters'
import { FavoritesStore } from '../Store/FavoritesStore'
import { Stores } from '../Settings/Stores'
import { Collection } from './Collection'
import { fetchEventsById } from '../Helpers/FetchEventList'
import DanceEvent from '../DTO/DanceEvent'

function isFavPageVisible () {
    return window.location.href.includes(pageFavorites + '::')
}

const pageFavorites = 'favorites'
const pageList = 'events'

export default function create () {
    const collection = new Collection()
    const list = new EventList(collection)
    const filters = new Filters()
    const favStore: FavoritesStore = Alpine.store(Stores.FavoriteStore)

    return {
        list,
        filters,
        favoritesAvailable: favStore.hasFavorites,
        visiblePage: (isFavPageVisible() ? pageFavorites : pageList),

        switchVisiblePage: function () {
            this.visiblePage = isFavPageVisible() ? pageList : pageFavorites
            this.updateSearchQuery(this.filters.searchQuery || '')
        },

        updateSearchQuery: function (search: string): void {
            const values = search.split('::')
            search = (values.pop() || '').replace('?', '')
            const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname +
                '?' + [this.visiblePage, search].join('::&')
            window.history.pushState({ path: newurl }, '', newurl)
        },

        handleFilterChange: async function (value: string, oldValue: string) {
            if (value === oldValue) {
                return
            }
            this.updateSearchQuery(value)
            this.list.reset()
        },

        handleOpenEventSection (current: string | null, s: string): string | null {
            return current === s
                ? null
                : s
        },

        getEventFromCollection: async function (id: number) {
            const danceEvent = this.list.getFromCollection(id)
            if (danceEvent) {
                return danceEvent
            }
            // this call returns an array, however we're sure to only get as single element,
            // so let's just grap the last one and be done with it.
            return (await fetchEventsById({ id: [id] })).pop()
        },

        isDanceEvent: function (e: Object) {
            return e instanceof DanceEvent
        },
        fetchSharedEvent: FetchSharedEvents
    }
}
