import { EventList } from './DanceEventList/EventList'

import { Notepad } from './DanceEventList/Notepad'
import { createPickster } from './DanceEventList/Dates'
import fetchEventTeasers from './DanceEventList/Preview'
import { setTouchBodyClass } from './Helpers/TouchDeviceDetection'
import List from './Learn/List'
import { createMobileNavigation } from './Navigation/Mobile'
import danceEventPageFacade from './DanceEventList/DanceEventPageFacade'
import { Filters } from './DanceEventList/Filters'
import FetchSharedEvents from './Helpers/FetchSharedEvents'
import DanceEventQr from './DanceEventList/DanceEventQr'

declare global {
    interface Window { // eslint-disable-line
        RMST_TS: Object;
    }
}

window.RMST_TS = {
    LearnList: List,
    fetchEventTeasers: fetchEventTeasers,
    createMobileNavigation: createMobileNavigation,
    createPickster,
    notepad: new Notepad(),
    danceEventPageFacade,
    EventList,
    eventFilters: Filters,
    FetchSharedEvents,
    DanceEventQr
}

document.addEventListener('DOMContentLoaded', function (event) {
    setTouchBodyClass()
    // const pickster = new Pickster()
    // console.log(pickster.datesInMonth(2021, 9))
})

document.addEventListener('alpine:init', () => {
    Alpine.store('mobileNavigationStore', createMobileNavigation()) // eslint-disable-line
})

document.addEventListener('alpine:initialized', () => {
    console.log('alpine initialized')
})
