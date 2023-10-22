import { Response, Request } from "express";
import { catchAsync } from "../middleware/catchAsync";
import { URLType } from "../types/urlType";
import url from "../models/url";

const createShortURL = catchAsync(async (req: Request, res: Response) => {
    const short_url: URLType = await url.create(req.body);
    res.status(200).json(short_url);
});

export {
    createShortURL
};