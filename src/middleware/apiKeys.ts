import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

const generateKey = function () {
  const arr = [...Array(30)];
  return arr
    .map(function () {
      return ((Math.random() * 36) | 0).toString(36);
    })
    .join('');
};

const validateKey = async function (req: Request, res: Response, next: NextFunction) {
  const host = req.headers.host;
  const apiKey = req.get('x-api-key');
  const account = await User.findOne({ host: host, api_key: apiKey });

  if (account) {
    account.apiKeyUsage.lastAccessTime = new Date();
    account.apiKeyUsage.requests = account.apiKeyUsage.requests + 1;
    account.save();
    return next();
  }
  res.status(403).send({ error: { code: 403, message: 'Access Denied.' } });
};

export { generateKey, validateKey };
