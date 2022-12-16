import type { Request, Response, NextFunction } from 'express';

export default function (timeDelay: number) {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log(`Simulating network delay of ${timeDelay / 1000} seconds`);
    setTimeout(() => {
      next();
    }, timeDelay);
  };
}
