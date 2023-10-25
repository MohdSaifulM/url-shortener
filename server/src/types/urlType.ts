import { Document } from "mongoose";
import { ClickType } from "./clickType";
import { UserType } from "./userType";

export interface URLType extends Document {
    user: UserType | null,
    title: string | null,
    original_url: string,
    short_url: string,
    domain: string | null,
    clicks: [ClickType]
}