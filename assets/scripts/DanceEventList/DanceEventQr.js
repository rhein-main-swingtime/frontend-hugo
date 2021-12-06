import QRCode from 'qrcode'

/**
 *
 * @param {DanceEvent} danceEvent
 */
export default function (danceEvent) {
    const canvas = document.getElementById('dance-event-qr-' + danceEvent.id)
    const url = window.location.href.split('?')[0] + '?highlight=' + danceEvent.id
    QRCode.toCanvas(
        canvas,
        url,
        {
            width: 500,
            height: 'auto'
        },
        function (error) {
            if (error) console.error(error)
            console.log('success!')
        }
    )
}
