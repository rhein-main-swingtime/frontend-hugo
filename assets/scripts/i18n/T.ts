const translations = siteTranslations || window.siteTranslations || {}

function getLang (): string {
    return window.siteLang;
    const long: string = navigator.language || navigator.userLanguage
    const short = long.substring(0, 2)
    return Object.keys(translations).includes(long) ? long : short
}

export function isTranslationDefined (key: string): boolean {
    return translations[getLang()][key] !== undefined
}

export default function (key: string, num: number | undefined = undefined) {
    try {
        if (translations[getLang()][key] === undefined) {
            console.error('key ' + key + ' is not a valid translation key')
            return key
        }
    } catch (e: any) {
        console.error(e)
    }

    return translations[getLang()][key].other || 'Not translated! [' + getLang() + '/' + key + ']'
}
