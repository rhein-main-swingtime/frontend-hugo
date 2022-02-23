const translations = window.siteTranslations || {}

export function isTranslationDefined (key: string): boolean {
    if (!Object.keys(translations).includes(key)) {
        console.info('Did not find translation for ' + key)
        return false
    }
    return true
}

export default function (key: string, num: number | undefined = undefined) {
    key = key.toLowerCase()
    try {
        if (!isTranslationDefined(key)) {
            return key
        }
    } catch (e: any) {
        console.error(e)
    }

    return translations[key].other
}
