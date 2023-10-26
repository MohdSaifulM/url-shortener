import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface ClickType extends Document {
    location: {
        country: string,
        state: string,
        city: string
    },
    deviceType: string,
    browser: string,
    operatingSystem: string,
    urlId: ObjectId
}