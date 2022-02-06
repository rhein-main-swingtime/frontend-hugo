interface GenericListCategoryConfig {
    items: string[]
    exclusive: boolean
}

interface GenericListConfig {
    categories: {
        [key: string]: GenericListCategoryConfig
    }
    identifier: string,
    filterable: string[],
    title: string,
    trash: string | false
}

class GenericFilterBar {
    config: GenericListConfig
    filters: {
        [key: string]: {
            [key: string]: boolean
        }
    } = {}

    items: object[] = []

    public registerElement (element: any) {
        console.log(element)
        this.items.push(element)

        this.config.filterable.forEach((k) => {
            if (this.filters[k] === undefined) {
                this.filters[k] = {}
            }

            if (this.filters[k][element[k]] === undefined) {
                this.filters[k][element[k]] = false
            }
        })
    }

    public getSelectedFilters (category: string): string|null {
        for (const [key, value] of Object.entries(this.filters[category])) {
            if (value) {
                return key
            }
        }
        return null
    }

    public elementMatchesFilters (element: object): boolean {
        let out = true

        this.config.filterable.forEach((f) => {
            if (out === false) {
                return
            }

            const selected = this.getSelectedFilters(f)
            if (selected !== null && element[f] !== selected) {
                out = false
            }
        })

        return out
    }

    get isVisible () {
        return (element: object) => {
            const out = this.elementMatchesFilters(element)
            return out
        }
    }

    public toggleSelection (category: string, item: string): void {
        if (this.filters[category] === undefined) {
            throw Error(category + ' is not a valid category in this context')
        }

        Object.keys(this.filters[category]).forEach(
            (f) => {
                if (f === item) {
                    this.filters[category][f] = !this.filters[category][f]
                } else {
                    this.filters[category][f] = false
                }
            }
        )
    }

    constructor (config: GenericListConfig) {
        this.config = config
    }
}

export default function GenericFilterBarFactory (config: GenericListConfig) {
    return new GenericFilterBar(config)
}
