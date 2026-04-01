export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

export interface Wish {
    id: string;
    name: string;
    message: string;
    timestamp: string;
}
