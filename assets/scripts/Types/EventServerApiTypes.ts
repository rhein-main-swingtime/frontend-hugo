export interface DanceEventPayload {
    id: number
    foreign_url: string         // eslint-disable-line
    source: string
    creator: string
    location: string
    city: string
    summary: string
    description: string
    created: string
    category: 'class' | 'socials'
    start_date_time: string     // eslint-disable-line
    end_date_time?: string      // eslint-disable-line
    startDateTime?: string      // eslint-disable-line
    endDateTime?: string        // eslint-disable-line
}

export interface DanceEventDatesInterface {
    [key: string]: number[]
}

export interface EventServerApiPayload {
    dates: DanceEventDatesInterface,
    danceEvents: DanceEventPayload[]
}

interface FilterItem {
    name: string;
    available: number
}

export interface FilterApiPayload {
    filters: {
        calendar: FilterItem[],
        category: FilterItem[],
        city: FilterItem[],
    },
    totalCount: number
}
