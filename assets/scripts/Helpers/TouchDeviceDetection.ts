export function detectTouchDevice () {
    return ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (((navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints || 0) > 0)
}

export function setTouchBodyClass () {
    if (detectTouchDevice()) {
        document.body.classList.add('is-touch-enabled')
    }
}
