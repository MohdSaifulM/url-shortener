import { Document, Model, Types } from "mongoose";

export interface UserType extends Document {
    username: string,
    password: string,
    email: string,
    dateJoined: Date
}

export interface UserModel extends Model<UserType> {
    register(username: string, email: string, password: string, confirmPassword: string): UserType,
    login(username: string, password: string): UserType,
    updatePassword(password: string, confirmPassword: string, userId: Types.ObjectId): UserType
}