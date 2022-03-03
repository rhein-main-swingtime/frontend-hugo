
export interface trackingEventInterface {
    category: 'danceEventFavorite' | 'eventfilter' | 'filterbar' | 'danceEventInteraction',
    action: string,
    name?: string,
    value?: number
}

export default function trackEvent (e: trackingEventInterface): void {
    if (!window._paq) {
        console.info('_paq method not found')
        return
    }
    if (location.host.includes('localhost')) {
        console.info('tracking event', e)
    }

    window._paq.push([
        e.category,
        e.action,
        e.name,
        e.value
    ])
}
