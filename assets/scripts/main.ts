import { EventList } from './DanceEventList/EventList'

import { FavoritesStore } from './Store/FavoritesStore'
import { createPickster } from './DanceEventList/Dates'
import fetchEventTeasers from './DanceEventList/Preview'
import { setTouchBodyClass } from './Helpers/TouchDeviceDetection'
import List from './Learn/List'
import MobileNavigationStore, { createMobileNavigation } from './Navigation/Mobile'
import danceEventPageFacade from './DanceEventList/DanceEventPageFacade'
import { Filters } from './DanceEventList/Filters'
import FetchSharedEvents from './Helpers/FetchSharedEvents'
import DanceEventQr from './DanceEventList/DanceEventQr'
import { Input } from 'postcss'
import GenericFilterBarFactory from './FilterBar/FilterBar'
import T from './i18n/T'
import { Stores } from './Settings/Stores'

declare global {
    interface Window { // eslint-disable-line
        RMST_TS: Object;
        T: Function;
    }
}

window.RMST_TS = {
    LearnList: List,
    fetchEventTeasers,
    createMobileNavigation: createMobileNavigation,
    createPickster,
    notepad: new FavoritesStore(),
    danceEventPageFacade,
    EventList,
    eventFilters: Filters,
    FetchSharedEvents,
    DanceEventQr,
    filterBar: GenericFilterBarFactory
}

window.T = T

document.addEventListener('DOMContentLoaded', function (event) {
    setTouchBodyClass()
    // const pickster = new Pickster()
    // console.log(pickster.datesInMonth(2021, 9))
})

document.addEventListener('alpine:init', () => {
    Alpine.store(Stores.MobileNavigationStore, new MobileNavigationStore) // eslint-disable-line
    Alpine.store(Stores.FavoriteStore, new FavoritesStore())        // eslint-disable-line
})
