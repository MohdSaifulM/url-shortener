import mongoose, { model, Schema } from "mongoose";
import { URLType } from "../types/urlType";

const urlSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
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