import T, { isTranslationDefined } from '../i18n/T'

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
    trash: string | false,
    showCategories: boolean | undefined,
    i18nPrefix: string | undefined
}

class GenericFilterBar {
    config: GenericListConfig
    filters: {
        [key: string]: {
            [key: string]: boolean
        }
    } = {}

    items: {[key:string]: any}[] = []

    public registerElement (element: any) {
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

    public elementMatchesFilters (element: {[key:string]: any}): boolean {
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

    get visibleIds (): string[] {
        // first step filters elements, by visibility
        // seconds step takes elements, and returns only the identifiers
        return this.items.filter(i => this.isVisible(i) && i[this.config.identifier] !== undefined)
            .map(i => i[this.config.identifier])
    }

    get noItemsAvailable (): boolean {
        return this.visibleIds.length === 0
    }

    get categoriesVisibleInBar (): boolean {
        return this.config.showCategories === true
    }

    public getTranslation (key: string): string {
        if (this.config.i18nPrefix === undefined) {
            return key
        }

        const fullKey = this.config.i18nPrefix + '-' + key
        if (!isTranslationDefined(fullKey)) {
            return key.replace(this.config.i18nPrefix, '')
        }
        return T(fullKey)
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

    public resetSelections (): void {
        Object.keys(this.filters).forEach(
            (c) => {
                Object.keys(this.filters[c]).forEach(item => {
                    this.filters[c][item] = false
                })
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
