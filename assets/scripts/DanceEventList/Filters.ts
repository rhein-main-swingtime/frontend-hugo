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

const hiddenFilters = [
    'Social Time'
]

export class Filters {
    public _filters: FilterSettings = {}
    public loading: boolean = true
    public initialized: boolean = false
    public showClasses: boolean = false
    public hideSocials: boolean = false
    public showDates: boolean = false
    public fromDate: string | false = false
    public toDate: string | false = false

    private getCheckedByUrl (category: string, name: string): boolean {
        return window.location.search.includes(encodeURIComponent(category) + '[]=' + encodeURIComponent(name))
    }

    private formatDateForField (d: Date | string) {
        d = new Date(d)
        return [d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, '0'),
            String(d.getDate() + 1).padStart(2, '0')
        ].join('-')
    }

    get minMaxDates () {
        const today = this.formatDateForField(new Date())
        const maxDate = new Date()
        maxDate.setFullYear((new Date()).getFullYear() + 2)
        const max = this.formatDateForField(
            maxDate
        )
        return {
            minFrom: today,
            maxFrom: (this.toDate
                ? this.toDate
                : max),
            minTo: (this.fromDate
                ? this.fromDate
                : today),
            maxTo: max
        }
    }

    private getParamsAsObject () {
        const out: {[key:string]: string[]} = {}
        const path = window.location.toString().split('?')[1] || ''
        path.split('&')
            .forEach((i) => {
                const [key, val] = i.split('=', 2)
                if (out[key] === undefined) {
                    out[key] = []
                }
                out[key].push(val)
            })
        return out
    }

    private setStateFromSearchParams () {
        this.showClasses = window.location.search.includes('calendar[]=') ||
        window.location.search.includes('category[]=class')

        this.hideSocials = this.showClasses === true &&
        window.location.search.includes('calendar[]=' + encodeURIComponent('Social Time'))

        const params = this.getParamsAsObject()
        if (params.from !== undefined) {
            this.fromDate = params.from![0] || false
        }
        if (params.to !== undefined) {
            this.toDate = params.to![0] || false
        }

        this.showDates = (this.toDate !== false || this.fromDate !== false)
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
                this.setStateFromSearchParams()
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
            if (key === 'category') {
                if (this.showClasses) {
                    out.push(param + encodeURIComponent('class'))
                    if (!this.hideSocials) {
                        out.push('calendar[]=' + encodeURIComponent('Social Time'))
                    }
                }
            } else if (key === 'calendar') {
                if (this.showClasses) {
                    values
                        .filter(v => v.checked && !hiddenFilters.includes(v.name))
                        .forEach(v => out.push(param + encodeURIComponent(v.name)))
                }
            } else {
                values
                    .filter(v => v.checked && !hiddenFilters.includes(v.name))
                    .forEach(v => out.push(param + encodeURIComponent(v.name)))
            }
        }

        if (this.showDates) {
            if (this.fromDate && this.fromDate !== '') {
                out.push('from=' + this.fromDate)
            }
            if (this.toDate && this.toDate !== '') {
                out.push('to=' + this.toDate)
            }
        }

        if (out.length === 0) {
            return ''
        }

        return '?' + out.join('&')
    }
}
