import type { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export default function (Model: Model<unknown>, param: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      req.items = await Model.find({ [param]: req.params[param] });
      next();
    } catch (error) {
      next(error);
    }
  };
}
