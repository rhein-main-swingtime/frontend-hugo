import { elementOffset } from './UiHelpers'

// @todo naming sucks here, this does not scroll, but returns a function -> refactor
export default function (el: Element) {
    return () => {
        const offset = elementOffset(el)
        const header = document.getElementById('page-mast-head')
        if (header) {
            offset.top = offset.top - header.offsetHeight
        }
        window.scrollTo({
            top: offset.top,
            behavior: 'smooth'
        })
    }
}
