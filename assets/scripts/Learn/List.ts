import { LearnListPayload } from '../Types/LearnListPayload'

interface LearnListSelectionInterface {
    city: boolean | string
    category: boolean | string
}

class LearnList {
    items: LearnListPayload
    filterableCategories: string[]

    selected: LearnListSelectionInterface = {
        city: false,
        category: false
    }

    constructor(items: LearnListPayload, filterableCategories: string[]) {
        this.items = items
        console.log(items)
        this.filterableCategories = filterableCategories
    }

    public resetSelections = function (this: LearnList) {
        this.selected.city = false
        this.selected.category = false
    }

    public addSelection = function (this: LearnList, key: 'city' | 'category', value: string) {
        if (this.selected[key] === value) {
            this.selected[key] = false
        } else {
            this.selected[key] = value
        }
    }

    public get visibleItems(): string[] {
        const names: string[] = []
        this.items.forEach((i) => {
            if (
                (i.city === this.selected.city || !this.selected.city) &&
                (i.category === this.selected.category || !this.selected.category)
            ) {
                names.push(i.name)
            }
        })
        return names
    }

    public get trashActive(): boolean {
        return (this.selected.city !== false ||
            this.selected.category !== false)
    }
}

export default function (items: LearnListPayload) {
    return {
        list: new LearnList(items)
    }
}
