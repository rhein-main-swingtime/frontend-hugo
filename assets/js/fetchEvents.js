export default async function (data) {
    const url = new URL('http://localhost:8088/eventList/v1/' + data.calendar)
    url.search = new URLSearchParams(data.options).toString()
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }

    const events = await response.json()
    return events
}
