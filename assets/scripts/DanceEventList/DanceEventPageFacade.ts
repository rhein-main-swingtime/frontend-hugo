import FetchSharedEvents from '../Helpers/FetchSharedEvents'
import { EventList } from './EventList'
import { Filters } from './Filters'
import { FavoritesStore } from '../Store/FavoritesStore'
import danceEvent from '../DTO/DanceEvent'
import { Stores } from '../Settings/Stores'

function updateSearchQuery (search: string): void {
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + search
    window.history.pushState({ path: newurl }, '', newurl)
}

export default function create () {
    const list = new EventList()
    const filters = new Filters()
    const favStore: FavoritesStore = Alpine.store(Stores.FavoriteStore)

    return {
        list,
        filters,
        favoritesAvailable: favStore.hasFavorites,
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
        handleFav (danceEvent: danceEvent) {

            favStore.toggle(danceEvent)
            if (this.filters.onlyFavorites && !favStore.danceEventIdsInCollection.includes(danceEvent.id.toString())) {
                this.list.removeEvent(danceEvent.id)
            }
        },
        fetchSharedEvent: FetchSharedEvents
    }
}
