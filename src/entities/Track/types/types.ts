export interface Track {
    id: number
    title: string,
    description: string,
    audio: string,
    cover: string,
    isActive: boolean
    createdAt:string
    updatedAt:string
}

export type TrackFields = keyof Track
