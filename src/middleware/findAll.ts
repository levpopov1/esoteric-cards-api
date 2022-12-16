import type { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export default function (Model: Model<unknown>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      req.items = await Model.find({});
      next();
    } catch (error) {
      next(error);
    }
  };
}
