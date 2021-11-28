export interface DanceEventPayload {
    id: number
    foreignUrl: string
    source: string
    creator: string
    location: string
    city: string
    summary: string
    description: string
    created: string
    start_date_time: string     // eslint-disable-line
    end_date_time?: string      // eslint-disable-line
    startDateTime?: string      // eslint-disable-line
    endDateTime?: string        // eslint-disable-line
}

export interface EventServerApiPayload {
    cities: string[]
    dates: string[]
    categories: string[]
    calendars: string []
    danceEvents: DanceEventPayload[]
}
