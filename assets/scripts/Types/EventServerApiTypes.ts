export interface DanceEventPayload {
    id: number
    foreign_url: string
    source: string
    creator: string
    location: string
    city: string
    summary: string
    description: string
    created: string
    category: 'class' | 'socials'
    start_date_time: string
    end_date_time?: string
    startDateTime?: string
    endDateTime?: string
    day_number?: number | null
    day_count?: number | null
    dayNumber?: number | null
    dayCount?: number | null
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
