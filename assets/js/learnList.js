export default function (items) {
    const allItems = items
    const visibleItems = []

    const selected = {
        city: false,
        category: false
    }

    const reset = function () {
        this.selected.city = false
        this.selected.category = false
    }

    const setVal = function (key, val) {
        if (this.selected[key] === val) {
            this.selected[key] = false
        } else {
            this.selected[key] = val
        }
        updateVisible()
    }

    const updateVisible = function () {
        const visible = []
        this.allItems.forEach((i) => {
            if (
                (i.category === this.selected.category || this.selected.category === false) &&
                (i.city === this.selected.city || this.selected.city === false)
            ) {
                visible.push(i.name)
            }
        })
        this.visibleItems = visible
    }

    const itemVisible = function (name) {
        return this.visibleItems === undefined || this.visibleItems.includes(name)
    }

    const trashActive = function () {
        return this.selected.city !== false ||
    this.selected.category !== false
    }

    return {
        selected,
        reset,
        setVal,
        itemVisible,
        trashActive,
        visibleItems,
        allItems,
        updateVisible
    }
}
