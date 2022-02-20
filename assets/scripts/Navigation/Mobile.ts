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
        console.info(f, 'registering')
        this.scrollToTopHandler = f
    }

    public unregisterBackToTop () {
        console.info('unregistering')
        this.scrollToTopHandler = null
    }

    get hasScrollToTop () {
        return this.scrollToTopHandler !== null
    }
}
