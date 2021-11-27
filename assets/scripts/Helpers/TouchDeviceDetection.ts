
export function detectTouchDevice () {
    return ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0)
}

export function setTouchBodyClass () {
    if (detectTouchDevice()) {
        document.body.classList.add('is-touch-enabled')
    }
}
