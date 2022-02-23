import scrollToElement from './scrollToElement'

export default function (el: HTMLElement) {
    Array.from((el.getElementsByTagName('a'))).forEach((e) => {
        const handler = (event: Event) => {
            const target = document.getElementById(e.getAttribute('href')?.split('#')[1])
            if (target) {
                event.preventDefault()
                return scrollToElement(target)()
            }
        }
        e.addEventListener('click', handler)
    })
}
