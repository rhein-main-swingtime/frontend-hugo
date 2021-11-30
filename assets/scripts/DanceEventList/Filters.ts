import RMSTApiUrls from '../Settings/RMSTApiUrls'
import { FilterApiPayload } from './../Types/EventServerApiTypes'
interface FilterItemInterface {
    name: string
    available: number
    checked: boolean
}

interface FilterSettings {
    [key: string]: FilterItemInterface[]
}

export class Filters {
    public _filters: FilterSettings = {}
    public loading: boolean = true
    public initialized: boolean = false
    public showClasses: boolean = false
    test123: string[] = []

    private getCheckedByUrl (category: string, name: string): boolean {
        return window.location.search.includes(encodeURIComponent(category) + '[]=' + encodeURIComponent(name))
    }

    public async init () {
        const url = new URL(RMSTApiUrls.filters)
        url.search = window.location.search
        const response = await fetch(url.toString())

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`
            throw new Error(message)
        }

        response.json().then(
            (payload: FilterApiPayload) => {
                const filters: FilterSettings = {}
                for (const [category, items] of Object.entries(payload.filters)) {
                    const filterCategory: FilterItemInterface[] = []
                    items.forEach(i => filterCategory.push({
                        name: i.name,
                        available: i.available,
                        checked: this.getCheckedByUrl(category, i.name)
                    }))
                    filters[category] = filterCategory
                }
                this._filters = filters
                this.loading = false
                this.initialized = true
            }
        )
    }

    get itemsInCategory () {
        return (category: string) => {
            return this._filters[category] || []
        }
    }

    get categories () {
        return Object.keys(this._filters) || []
    }

    get searchQuery (): string | null {
        if (this._filters === {}) {
            return null
        }

        const out: string[] = []

        for (const [key, values] of Object.entries(this._filters)) {
            const param = encodeURIComponent(key) + '[]='
            values.filter(v => v.checked).forEach(v => out.push(param + encodeURIComponent(v.name)))
        }

        if (out.length === 0) {
            return ''
        }

        return '?' + out.join('&')
    }
}
