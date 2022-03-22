
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

    try {
        window._paq.push([
            e.category.toString(),
            e.action.toString(),
            e.name,
            e.value
        ])
    } catch (e) {
        console.error(e)
    }
}
