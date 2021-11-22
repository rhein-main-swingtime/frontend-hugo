export default function () {

    const selected = {
        'city': false,
        'category': false
    }

    const reset = function() {
        this.selected.city = false,
        this.selected.category = false
    }

    const setVal = function(key, val) {
        if (this.selected[key] === val) {
            this.selected[key] = false
        } else {
            this.selected[key] = val
        }
    }

    const itemVisible= function (city, category) {
        return (city === this.selected.city || this.selected.city === false)
            && (category === this.selected.category || this.selected.category === false)
    }

    const trashActive = function() {
        return this.selected.city !== false || this.selected.category !== false
    }

    return {
        selected,
        reset,
        setVal,
        itemVisible,
        trashActive
    }
}