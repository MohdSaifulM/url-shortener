import { Document, Types } from "mongoose";
import { UserType } from "./userType";

export interface URLType extends Document {
    user: UserType | null,
    title: string | null,
    original_url: string,
    short_url: string,
    domain: string | null,
    clicks: Types.ObjectId[]
}