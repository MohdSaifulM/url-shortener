import { Response, Request } from "express";
import { catchAsync } from "../middleware/catchAsync";
import { URLType } from "../types/urlType";
import url from "../models/url";
import { generateShortURL } from "../utils/generateShortURL";

export const createShortURL = catchAsync(async (req: Request, res: Response) => {
    // Define short url if not given
    if (!req.body.short_url) req.body.short_url = generateShortURL();
    // Check if url already exist and keep generating short url
    do {
        req.body.short_url = generateShortURL();
    } while (await url.findOne({ short_url: req.body.short_url }));
    // Save new url document
    const newURL: URLType = await url.create(req.body);
    res.status(200).json(newURL);
});

export const fetchAllURLs = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const urls: URLType[] = await url.find({user: userId});
    res.status(200).json(urls);
});

export const deleteURL = catchAsync(async (req: Request, res: Response) => {
    const { urlId } = req.params;
    const deleted = await url.deleteOne({ _id: urlId });
    res.status(200).json(deleted);
});
