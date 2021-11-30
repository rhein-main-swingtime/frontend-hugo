export default interface EventListApiParams {
    limit?: number |null
    skip?: number
    fromDate?: Date | null
    toDate?: Date | null
    cites?: string[] | null
    calendars?: string[] | null
    categories?: string[] | null
}
