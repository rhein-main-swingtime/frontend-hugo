class MobileNavigationItem {
    readonly href
    readonly copy
    readonly active

    constructor (element: Element) {
        this.href = element.getAttribute('href') || ''
        this.copy = element.textContent || ''
        this.active = element.classList.contains('active')
    }
}

class MobileNavigation {
    open: boolean = false
    readonly links: MobileNavigationItem[] = []

    constructor () {
        this.open = false
        this.collectNodes()
    }

    private collectNodes (): void {
        const nodes = document.getElementsByClassName('in-mobile-nav')
        for (const item of nodes) {
            this.links.push(new MobileNavigationItem(item))
        }
    }

    public toggle (): void {
        this.open = !this.open
    }
}

export function createMobileNavigation () {
    return new MobileNavigation()
}
