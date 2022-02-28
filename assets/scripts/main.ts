import { EventList } from './DanceEventList/EventList'

import { FavoritesStore } from './Store/FavoritesStore'
import { createPickster } from './DanceEventList/Dates'
import fetchEventTeasers from './DanceEventList/Preview'
import { setTouchBodyClass } from './Helpers/TouchDeviceDetection'
import List from './Learn/List'
import danceEventPageFacade from './DanceEventList/DanceEventPageFacade'
import { Filters } from './DanceEventList/Filters'
import FetchSharedEvents from './Helpers/FetchSharedEvents'
import DanceEventQr from './DanceEventList/DanceEventQr'
import createFilterBarInstance from './FilterBar/FilterBar'
import T from './i18n/T'
import { Stores } from './Settings/Stores'
import scrollToElement from './Helpers/scrollToElement'
import TocWrapper from './Helpers/TocWrapper'
import MobileNavigationStore from './Store/Mobile'

declare global {
    interface Window { // eslint-disable-line
        RMST_TS: Object;
        T: Function;
        siteTranslations: {[key: string]: {
            [key: string]: string
        }},
        siteLang: string,
        _paq: {
            push: Function
        }
    }
}

window.RMST_TS = {
    LearnList: List,
    fetchEventTeasers,
    createPickster,
    notepad: new FavoritesStore(),
    danceEventPageFacade,
    EventList,
    eventFilters: Filters,
    FetchSharedEvents,
    DanceEventQr,
    createFilterBarInstance,
    createScrollToElement (el: Element) {
        return scrollToElement(el)
    },
    createTocWrapper (el: any) {
        return TocWrapper(el)
    }
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
