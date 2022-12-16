import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { generateKey } from '../middleware/apiKeys';

function getAllUsers(req: Request, res: Response) {
  res.status(200).json(req.items);
}

function getOneUser(req: Request, res: Response) {
  res.status(200).json(req.item);
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.host;

  const acc = {
    api_key: generateKey(),
    host: origin,
    usage: {
      requests: 0,
      lastAccessTime: new Date(),
    },
  };

  try {
    const newUser = await User.create(acc);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export { getAllUsers, getOneUser, registerUser };
