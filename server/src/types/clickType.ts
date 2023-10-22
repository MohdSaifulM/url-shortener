import { Document } from 'mongoose';

export interface ClickType extends Document {
    location: {
        country: string,
        state: string,
        city: string
    },
    deviceType: string,
    browser: string,
    operatingSystem: string
}