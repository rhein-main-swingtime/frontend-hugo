export default function (items) {
    const visible = items.map(i => i.name)

    const selected = {
        city: false,
        category: false
    }

    const resetSelections = function () {
        this.selected.city = false
        this.selected.category = false
    }

    const addSelection = function (key, value) {
        if (this.selected[key] === value) {
            this.selected[key] = false
        } else {
            this.selected[key] = value
        }
    }

    return {
        visible,
        selected,
        resetSelections,
        items,
        get visibleItems () {
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
        },
        get trashActive () {
            return (this.selected.city !== false ||
                this.selected.category !== false)
        },
        addSelection
    }
}
