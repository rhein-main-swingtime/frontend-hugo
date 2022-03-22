
export interface trackingEventInterface {
    category: 'danceEventFavorite' | 'eventfilter' | 'filterbar' | 'danceEventInteraction',
    action: string,
    name?: string,
    value?: number
}

export default function trackEvent (e: trackingEventInterface): void {
    if (!_paq) {
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
        _paq.push(payload)
    } catch (e) {
        console.error(e, payload)
    }
}
