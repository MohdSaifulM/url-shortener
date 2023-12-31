import mongoose, { model, Schema } from "mongoose";
import { ClickType } from "../types/clickType";

const clickSchema = new Schema({
    location: {
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        }
    },
    deviceType: {
        type: String
    },
    browser: {
        type: String
    },
    operatingSystem: {
        type: String
    },
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'URL'
    }
}, {
    timestamps: true
});

export default model<ClickType>('Click', clickSchema);