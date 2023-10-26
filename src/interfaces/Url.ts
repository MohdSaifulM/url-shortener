import { UserInterface } from "./User";
import { ClickInterface } from "./Click";

export interface UrlInterface {
    user: UserInterface | null;
    title: string | null;
    original_url: string;
    short_url: string;
    domain: string | null;
    clicks: ClickInterface[];
}