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

    public reset () {
        for (const values of Object.values(this._filters)) {
            values.forEach((v) => { v.checked = false })
        }
        this.showClasses = false
        this.hideSocials = false
        this.fromDate = false
        this.toDate = false
        this.showDates = false
    }

    get canBeReset () {
        const search = this.searchQuery || ''
        return search.replace('category[]=socials', '').length > 2 || this.showDates
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
            (
                window.location.search.includes('calendar[]=' + encodeURIComponent('Social Time')) === false &&
                window.location.search.includes('category[]=socials') === false
            )

        const params = this.getParamsAsObject()
        if (params.from !== undefined) {
            this.fromDate = params.from![0] || false
        }
        if (params.to !== undefined) {
            this.toDate = params.to![0] || false
        }

        this.showDates = (this.toDate !== false || this.fromDate !== false)
    }

    private handleQueryClasses (out: string[]): string[] {
        if (this.showClasses) {
            if (this.isClassCalendarSelected) {
                const selected = Object.values(this._filters.calendar || []).filter(v => v.checked === true)
                selected.forEach(v => out.push('calendar[]=' + encodeURIComponent(v.name)))
            } else {
                out.push('category[]=class')
            }
        }

        return out
    }

    private handleQuerySocials (out: string[]): string[] {
        if (this.hideSocials === false) {
            if (this.isClassCalendarSelected) {
                out.push('calendar[]=' + encodeURIComponent('Social Time'))
            } else {
                out.push('category[]=socials')
            }
        }

        return out
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
                    items.filter(i => i.name !== 'Social Time').forEach(i => filterCategory.push({
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

    get isClassCalendarSelected () {
        if (this._filters.calendar === undefined) {
            return false
        }
        return Object.values(this._filters.calendar).some(i => i.checked)
    }

    get searchQuery (): string | null {
        if (this._filters === {}) {
            return null
        }

        let out: string[] = []
        out = this.handleQueryClasses(out)
        out = this.handleQuerySocials(out)

        for (const city of Object.values(this._filters.city || {}).filter(i => i.checked)) {
            out.push('city[]=' + encodeURIComponent(city.name))
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
