import { elementOffset } from './UiHelpers'

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
