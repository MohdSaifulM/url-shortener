import { Response, Request } from "express";
import { catchAsync } from "../middleware/catchAsync";
import { URLType } from "../types/urlType";
import url from "../models/url";
import { generateShortURL } from "../utils/generateShortURL";

export const createShortURL = catchAsync(async (req: Request, res: Response) => {
    if (!req.body.short_url) req.body.short_url = generateShortURL();
    const short_url: URLType = await url.create(req.body);
    res.status(200).json(short_url);
});