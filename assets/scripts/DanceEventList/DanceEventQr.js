import QRCode from 'qrcode'
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
        }
    )
}
