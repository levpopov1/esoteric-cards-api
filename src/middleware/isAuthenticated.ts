import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isAuthenticated = async function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  try {
    if (!authHeader) {
      res.statusCode = 401;
      throw new Error('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, payload) {
      if (err) {
        res.statusCode = 403;
        return next(err);
      }
      req.payload = payload;
    });
  } catch (error) {
    return next(error);
  }

  return next();
};

export default isAuthenticated;
