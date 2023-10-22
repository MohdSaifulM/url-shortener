import { model, Schema } from "mongoose";
import { UserType } from "../types/userType";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default model<UserType>('User', userSchema);