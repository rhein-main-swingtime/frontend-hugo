import QRCode from 'qrcode'

/**
 *
 * @param {DanceEvent} danceEvent
 */
export default function (danceEvent) {
    const canvas = document.getElementById('dance-event-qr-' + danceEvent.id)
    QRCode.toCanvas(
        canvas,
        danceEvent.shareUrl + '?' + danceEvent.id,
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
