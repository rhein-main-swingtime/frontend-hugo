import { EventList } from './DanceEventList/EventList'

import { FavoritesStore } from './Store/FavoritesStore'
import { createPickster } from './DanceEventList/Dates'
import fetchEventTeasers from './DanceEventList/Preview'
import { setTouchBodyClass } from './Helpers/TouchDeviceDetection'
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

let scrollTarget: string;
function handleAnchorInUrl() {
    const anchor = window.location.hash.replace('#', '')
    history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
    );

    console.log(anchor)

    if (!anchor) {
        return;
    }

    scrollTarget = anchor;
}
handleAnchorInUrl();

function handleScrollToElementOnPageLoad() {
    const scrollTargetElement = document.getElementById(scrollTarget)

    if (scrollTargetElement) {
        const scrollFunction = scrollToElement(scrollTargetElement)
        scrollFunction()
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    setTouchBodyClass()
    handleScrollToElementOnPageLoad()
})

document.addEventListener('dance-events-loaded', function() {
    const scrollTargetElement = document.getElementById(scrollTarget)
    handleScrollToElementOnPageLoad()
})

document.addEventListener('alpine:init', () => {
    Alpine.store(Stores.MobileNavigationStore, new MobileNavigationStore) // eslint-disable-line
    Alpine.store(Stores.FavoriteStore, new FavoritesStore())        // eslint-disable-line
})
