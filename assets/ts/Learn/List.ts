import { LearnListPayload } from './Types/LearnListPayload'

interface LearnListSelectionInterface {
    city: boolean | string
    category: boolean | string
}

class LearnList {
    items: LearnListPayload

    constructor (items:LearnListPayload) {
        this.items = items
    }

    selected:LearnListSelectionInterface = {
        city: false,
        category: false
    }

    public resetSelections = function () {
        this.selected.city = false
        this.selected.category = false
    }

    public addSelection = function (key: string, value: string) {
        if (this.selected[key] === value) {
            this.selected[key] = false
        } else {
            this.selected[key] = value
        }
    }

    get visibleItems (): string[] {
        const names = []
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

    get trashActive (): boolean {
        return (this.selected.city !== false ||
            this.selected.category !== false)
    }
}

export default function (items: LearnListPayload) {
    return new LearnList(items)
}
