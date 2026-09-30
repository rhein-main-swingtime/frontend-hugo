import QRCode from 'qrcode'

/**
 * @param {import('../DTO/DanceEvent').default} danceEvent
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
        /** @param {Error | null | undefined} error */
        function (error) {
            if (error) console.error(error)
        }
    )
}
