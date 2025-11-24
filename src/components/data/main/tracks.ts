import { IconType } from 'react-icons';

export interface Track {
    id: string;
    text: string;
    img: string;
    icon: IconType;
}

export const tracks: Track[] = [];