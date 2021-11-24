import RMSTLearnList from 'js/LearnList'

declare global {
    interface Window { // eslint-disable-line
        RMST_TS: Object;
    }
}

window.RMST_TS = {
    LearnList: RMSTLearnList
}
