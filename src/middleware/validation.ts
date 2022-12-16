import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { body, ValidationChain } from 'express-validator';
import { User } from '../models/user';
// const saltRounds = 12;

// sequential processing, stops running validations chain if the previous one has failed.
const validateChains = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.context.errors) break;
    }
    return next();
  };
};

function validate(target: string) {
  switch (target) {
    case 'createUser':
      return validateChains([
        body('email')
          .exists()
          .withMessage('Missing email')
          .isEmail()
          .withMessage('Please provide a valid email')
          .bail()
          .custom(async function checkUserExists(value) {
            const userExists = await User.findOne({ email: value });
            if (userExists) {
              return Promise.reject('Email already in use');
            }
            return Promise.resolve();
          }),
        body('password')
          .exists()
          .withMessage('Missing password')
          .isLength({ min: 4, max: 64 })
          .withMessage('Password must be 16 to 64 characters'),
        body('username')
          .optional()
          .isLength({ min: 3, max: 32 })
          .withMessage('Username must be 3 to 32 characters'),
      ]);
    case 'login':
      return validateChains([
        body('email')
          .exists()
          .withMessage('Missing email')
          .isEmail()
          .withMessage('Invalid email')
          .bail()
          .custom(async function checkUserExists(value, { req }) {
            const userExists = await User.findOne({ email: value });
            if (userExists) {
              return Promise.resolve((req.user = userExists));
            }
            return Promise.reject('Incorrect email or password');
          }),
        body('password')
          .exists()
          .withMessage('Missing password')
          .isLength({ min: 4, max: 64 })
          .withMessage('Invalid password length, must be between 16 and 64 characters')
          .bail()
          .custom(async function verifyPassword(value, { req }) {
            const isPasswordValid = await bcrypt.compare(value, req.user.password);
            if (isPasswordValid) {
              return Promise.resolve();
            }
            return Promise.reject('Incorrect email or password');
          }),
      ]);
    default:
      return async function (next: NextFunction) {
        return next();
      };
  }
}

export default validate;
