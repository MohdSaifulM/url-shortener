import mongoose, { model, Schema } from "mongoose";
import { URLType } from "../types/urlType";

const urlSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    },
    domain: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date
    },
    clicks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Click'
        }
    ]
}, {
    timestamps: true
});

export default model<URLType>('URL', urlSchema);