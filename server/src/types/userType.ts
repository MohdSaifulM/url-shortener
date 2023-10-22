import { Document } from "mongoose";

export interface UserType extends Document {
    username: string,
    password: string,
    email: string,
    dateJoined: Date
}