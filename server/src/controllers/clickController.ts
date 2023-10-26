import { Response, Request } from "express";
import { catchAsync } from "../middleware/catchAsync";
import { ClickType } from "../types/clickType";
import click from "../models/click";