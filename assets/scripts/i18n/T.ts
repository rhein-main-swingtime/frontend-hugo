function getLang (): string {
    return navigator.language || navigator.userLanguage
}

const translations = siteTranslations || {}

export default function (key: string, num: number | undefined = undefined) {
    if (translations[getLang()][key] === undefined) {
        console.error('key ' + key + ' is not a valid translation key')
        return ''
    }

    return translations[getLang()][key].other || 'Not translated! [' + getLang() + '/' + key + ']'
}
