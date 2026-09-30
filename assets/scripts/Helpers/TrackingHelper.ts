
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

    const payload = [
        'trackEvent',
        e.category,
        e.action,
        e.name,
        e.value
    ]

    try {
        window._paq.push(payload)
    } catch (e) {
        console.error(e, payload)
    }
}
