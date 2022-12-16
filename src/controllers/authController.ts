import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 12;

function createAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
}

function createRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

// function verifyAccessToken(token) {
//   return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// }

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

// function generateErrorResponse(code, message, param) {
//   return {
//     code: code,
//     msg: message,
//   };
// }

async function login(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true });
    return res.status(400).json({ error: firstError[0].msg });
    // .json({ errors: errors.array({ onlyFirstError: true }) });
  }

  // if we get to this point, all validations have passed
  // and the user is set on the request object
  const accessToken = createAccessToken(req.user);
  const refreshToken = createRefreshToken(req.user);

  res.cookie('jid', refreshToken, { httpOnly: true });
  res.status(200).json({
    user: {
      id: req.user.id,
      username: req.user.username,
      accessToken: accessToken,
    },
  });
}

async function register(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username || email.slice(0, 31);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    User.create(
      {
        email: email,
        password: passwordHash,
        username: username,
      },
      function (err, result) {
        if (err) {
          return res.status(500).json({ error: 500, message: 'Failed to create user' });
        }

        const accessToken = createAccessToken(result);
        const refreshToken = createRefreshToken(result);

        res.cookie('jid', refreshToken, { httpOnly: true });
        return res.status(200).json({
          ok: true,
          user: {
            id: result.id,
            username: result.username,
            accessToken: accessToken,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 500, message: 'Failed to create user' });
  }
}

async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies.jid;

  if (!refreshToken) {
    return res.status(400).json({ error: 400, message: 'Missing token' });
  }

  try {
    verifyRefreshToken(refreshToken);
  } catch (error) {
    return res.status(401).json({ error: 401, message: 'Failed to verify token' });
  }

  const user = { id: req.payload.id, username: req.payload.username };
  const newRefreshToken = createRefreshToken(user);
  const newAccessToken = createAccessToken(user);

  res.cookie('jid', newRefreshToken, { httpOnly: true });
  res.status(200).json({
    ok: true,
    user: {
      id: user.id,
      username: user.username,
      accessToken: newAccessToken,
    },
  });
}

function logout(req: Request, res: Response) {
  // handle revoking of access tokens and refresh tokens
  res.status(200).json({ data: 'ok' });
}

function secret(req: Request, res: Response) {
  res.status(200).json({ route: 'secret', user: req.payload });
}

export { login, logout, register, secret, refreshToken };
