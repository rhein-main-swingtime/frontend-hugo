import fetchEventTeasers from './DanceEventList/Preview'
import { setTouchBodyClass } from './Helpers/TouchDeviceDetection'
import List from './Learn/List'
declare global {
    interface Window { // eslint-disable-line
        RMST_TS: Object;
    }
}

window.RMST_TS = {
    LearnList: List,
    fetchEventTeasers: fetchEventTeasers
}

document.addEventListener('DOMContentLoaded', function (event) {
    setTouchBodyClass()
})
