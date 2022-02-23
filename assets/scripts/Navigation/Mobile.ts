export default class MobileNavigationStore {
    open: boolean = false
    scrollToTopHandler: Function | null = null

    constructor () {
        this.open = false
    }

    public toggle (): void {
        this.open = !this.open
    }

    public registerBackToTop (f: Function) {
        this.scrollToTopHandler = f
    }

    public unregisterBackToTop () {
        this.scrollToTopHandler = null
    }

    get hasScrollToTop () {
        return this.scrollToTopHandler !== null
    }
}
