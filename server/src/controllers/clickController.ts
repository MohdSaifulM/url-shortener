import { Response, Request } from "express";
import { catchAsync } from "../middleware/catchAsync";
import { ClickType } from "../types/clickType";
import click from "../models/click";

export const fetchAllClicks = catchAsync(async (req: Request, res: Response) => {
    const { urlId } = req.params;
    const response: ClickType[] = await click.find({ urlId });
    res.status(200).json(response);
});