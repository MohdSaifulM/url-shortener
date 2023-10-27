import { UserInterface } from "./User";

export interface UrlInterface {
    _id: string,
    user: UserInterface | null;
    title: string | null;
    original_url: string;
    short_url: string;
    domain: string | null;
    clicks: string[];
}