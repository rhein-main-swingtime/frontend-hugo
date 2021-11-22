/**
 * This class represents a DanceEvent for use
 * in the frontend. It should remain unmutable
 */
class DanceEvent {

    dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    }

    /**
     * Constructor
     *
     * @param {Object} payload The payload should always correspond to the api at api.rmswing.de
     */
    constructor (
        payload
    ){

        this.id = payload.id
        this.foreignUrl = payload.foreignUrl || null;
        this.source = payload.source || null;
        this.creator = payload.creator || null;
        this.location = payload.location || null;
        this.city = payload.city || null;
        this.summary = payload.summary || null;
        this.description = payload.description || null;
        this.created = this.getDateFromVal(payload.created);
        this.startDateTime = this.getDateFromVal(payload.startDateTime);
        this.endDateTime = this.getDateFromVal(payload.endDateTime);
    }

    getDateFromVal(val) {
        if (typeof val !== "string") {
            return null
        }
        return new Date(val)
    }

    /**
     * Checks if event happens now
     *
     * @returns {boolean}
     */
    isNow(start, end) {
        const nowTime = new Date().getTime()
        return (
            this.getStartDateTime().getTime() <= nowTime &&
            this.getEndDateTime().getTime() > nowTime
        )
    }

    /**
     * Checks if a given date is today
     *
     * @param {Date} date
     * @returns {boolean}
     */
    isToday(date) {
        const now = new Date()
        return (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        )
    }

    /**
     * Checks if a given date is this year
     *
     * @param {Date} date
     * @returns {boolean}
     */
    isThisYear(date) {
        const now = new Date()
        return date.getFullYear() === now.getFullYear()
    }

    localizeDate(date) {
        const locale = 'de-DE'
        const options = this.dateOptions

        if (this.isNow()) {
            return 'Jetzt'
        }

        if (this.isToday(this.getEndDateTime())) {
            return 'Heute'
        }
        if (this.isThisYear(this.getEndDateTime())) {
            delete options['year']
        }
        return date.toLocaleDateString(locale, options)
    }

    getId() {
        return this.id
    }
    getForeignUrl() {
        return this.foreignUrl
    }
    getSource() {
        return this.source
    }
    getCreator() {
        return this.creator
    }
    getCreated() {
        return this.created
    }
    getLocation() {
        return this.location
    }
    getCity() {
        return this.city
    }
    getSummary() {
        return this.summary
    }
    getDescription() {
        return this.description
    }
    getStartDateTime() {
        return this.startDateTime
    }
    getStartDateLocalized() {
        return this.localizeDate(this.getStartDateTime())
    }
    getStartTimeLocalized() {
        return this.startDateTime.toLocaleString('de-DE', this.timeOptions)
    }
    getEndDateTime() {
        return this.endDateTime
    }
    getEndTimeLocalized() {
        return this.endDateTime.toLocaleString('de-DE', this.timeOptions)
    }
    getEndDateLocalized() {
        return this.localizeDate(this.getEndDateTime())
    }
}

export default DanceEvent;