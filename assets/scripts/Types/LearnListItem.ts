interface LearnListItemContact {
    mail?: string
    web?: string
    tel?: string
}

interface LearnListItemSocialMedia {
    youtube?: string
    facebook?: string
    instagram?: string
}

export interface LearnListItem {
    address: string,
    category: string,
    city: string,
    name: string
    contact: LearnListItemContact
    socialmedia: LearnListItemSocialMedia
}
