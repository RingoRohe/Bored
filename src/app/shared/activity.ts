export enum Type {
    EDUCATION = "education",
    RECREATIONAL = "recreational",
    SOCIAL = "social",
    DIY = "diy",
    CHARITY = "charity",
    COOKING = "cooking",
    RELAXATION = "relaxation",
    MUSIC = "music",
    BUSYWORK = "busywork"
}

export interface Activity {
    activity: string,
    type: Type,
    participants: number,
    price: number,
    link: string,
    key: string,
    accessibility: number
}

export interface ActivityType {
    text: string,
    icon: string
}