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

interface FilterBarFilterInterface {
    [key: string]: {
        [key: string]: boolean
    }
}

interface FilterBarInterface {
    config: GenericListConfig,
    filters: FilterBarFilterInterface
    items: {[key:string]: any}[],
    registerElement: Function,
    getSelectedFilters(category: string): string,
}

interface ContentItemInterface {
    [key: number | string] : string | number | string[]
}

export default function createFilterBarInstance (config: GenericListConfig) {
    return {
        config,
        filters: {},
        items: [],
        registerElement,
        getSelectedFiltersInCategory: getSelectedFilters,
        getTranslation,
        toggleSelection,
        resetSelections,
        get isVisible () {
            return (element: ContentItemInterface) => {
                let out = true
                this.config.filterable.forEach((f) => {
                    const selected = this.getSelectedFiltersInCategory(this.filters, f)
                    if (out === false || selected === null) {
                        return
                    }

                    const val = element[f]
                    switch (typeof val) {
                    case 'string':
                    case 'number':
                        out = (val === selected)
                        break
                    default:
                        out = val.includes(selected.toString())
                    }
                })

                return out
            }
        },
        get visibleIds (): string[] {
        // first step filters elements, by visibility
        // seconds step takes elements, and returns only the identifiers
            return this.items.filter(i => this.isVisible(i) && i[this.config.identifier] !== undefined)
                .map(i => i[this.config.identifier])
        },
        get noItemsAvailable (): boolean {
            return this.visibleIds.length === 0
        },
        get categoriesVisibleInBar (): boolean {
            return this.config.showCategories === true
        }
    }
}

function registerElement (this: FilterBarInterface, element: any) {
    this.items.push(element)

    this.config.filterable.forEach((k) => {
        if (this.filters[k] === undefined) {
            this.filters[k] = {}
        }

        if (this.filters[k][element[k]] === undefined) {
            if (Array.isArray(element[k])) {
                element[k].forEach((i: string) => { this.filters[k][i] = false })
            } else {
                this.filters[k][element[k]] = false
            }
        }
    })
}

function getSelectedFilters (filters: FilterBarFilterInterface, category: string): string|null {
    for (const [key, value] of Object.entries(filters[category])) {
        if (value) {
            return key
        }
    }
    return null
}

function getTranslation (this: FilterBarInterface, key: string): string {
    if (this.config.i18nPrefix === undefined) {
        return key
    }

    const fullKey = this.config.i18nPrefix + '-' + key
    if (!isTranslationDefined(fullKey)) {
        return key.replace(this.config.i18nPrefix, '')
    }
    return T(fullKey)
}

function toggleSelection (this: FilterBarInterface, category: string, item: string): void {
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

function resetSelections (this: FilterBarInterface): void {
    Object.keys(this.filters).forEach(
        (c) => {
            Object.keys(this.filters[c]).forEach(item => {
                this.filters[c][item] = false
            })
        }
    )
}
