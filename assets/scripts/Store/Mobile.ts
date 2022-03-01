interface togglePayload {
    id: string,
    payload: Object
}

export default class MobileNavigationStore {
    public readonly navIdMobileNav = 'nav:mobile'
    public readonly idForwardingNotice = 'notice:forwarding'

    openNav: string | null = null
    scrollToTopHandler: Function | null = null

    public toggle (id: string): void {
        if (this.openNav === id) {
            this.openNav = null
        } else if (this.openNav === null || this.openNav !== id) {
            this.openNav = id
        }
    }

    public registerBackToTop (f: Function) {
        this.scrollToTopHandler = f
    }

    public unregisterBackToTop () {
        this.scrollToTopHandler = null
    }

    get hasScrollToTop (): boolean {
        return this.scrollToTopHandler !== null
    }

    get open (): boolean {
        return this.openNav !== null
    }

    get isMobileNavOpen () {
        return this.openNav === this.navIdMobileNav
    }

    get isForwardingNoticeOpen () {
        return this.openNav === this.idForwardingNotice
    }
}
