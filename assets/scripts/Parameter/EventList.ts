export default interface EventListApiParams {
    limit: number |null
    fromDate: Date | null
    toDate: Date | null
    cites: string[] | null
    calendars: string[] | null
    categories: [] | null
}
