import { Response, Request, NextFunction } from 'express';

export const catchAsync = (func: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next).catch(next));
  }
}