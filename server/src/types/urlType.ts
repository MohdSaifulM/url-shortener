import { Document } from "mongoose";
import { ClickType } from "./clickType";
import { UserType } from "./userType";

export interface URLType extends Document {
    user: UserType,
    original_url: string,
    short_url: string,
    domain: string | null,
    creationDate: Date,
    expirationDate: Date | null,
    clicks: [ClickType]
}