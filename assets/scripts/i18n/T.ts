const translations = siteTranslations || window.siteTranslations || {}

function getLang (): string {
    const long: string = navigator.language || navigator.userLanguage
    const short = long.substring(0, 2)
    return Object.keys(translations).includes(long) ? long : short
}

export default function (key: string, num: number | undefined = undefined) {
    try {
        if (translations[getLang()][key] === undefined) {
            console.error('key ' + key + ' is not a valid translation key')
            return ''
        }
    } catch (e: any) {
        console.error(e)
    }

    return translations[getLang()][key].other || 'Not translated! [' + getLang() + '/' + key + ']'
}
