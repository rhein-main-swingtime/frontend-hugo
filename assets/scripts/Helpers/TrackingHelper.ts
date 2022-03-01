

interface trackingEventInterface {
    category: 'danceEventFavorite' | 'eventfilter' | 'filterbar',
    action: string,
    name?: string,
    value?: number
}

export default function trackEvent (e: trackingEventInterface): void {
    if (!window._paq) {
        console.info('_paq method not found')
        return
    }
    window._paq.push([
        e.category,
        e.action,
        e.name,
        e.value
    ])
}
