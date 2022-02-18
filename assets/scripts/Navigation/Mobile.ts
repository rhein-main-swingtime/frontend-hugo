class MobileNavigation {
    open: boolean = false

    constructor () {
        this.open = false
    }

    public toggle (): void {
        this.open = !this.open
    }
}

export function createMobileNavigation () {
    return new MobileNavigation()
}
