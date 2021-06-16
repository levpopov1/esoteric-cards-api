const { body } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 12;

function validate(target){

  // sequential processing, stops running validations chain if the previous one has failed.
  const validateChains = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
      return next();
    };
  };

  switch (target) {
    case 'createUser':
      return [
        body('email', 'Missing email').exists(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Missing password').exists(),
        body('password', 'Invalid password length, must be between 16 and 64 characters').isLength({min: 16, max: 64}),
        body('username').optional().isLength({min: 3, max: 32}),
        body('email').custom(async function checkUserExists(value){
          const userExists = await User.findOne({email: value});
          if(userExists){
            return Promise.reject('Email already in use');
          }
          return Promise.resolve();
        })
      ];
    case 'login':
      return validateChains([
        body('email')
          .exists().withMessage('Missing email')
          .isEmail().withMessage('Invalid email')
          .custom(async function checkUserExists(value, { req }){
            const userExists = await User.findOne({email: value});
            if(userExists){
              return Promise.resolve(req.user = userExists);
            }
            return Promise.reject('User does not exist');
          }),
        body('password')
          .exists().withMessage('Missing password')
          .isLength({min: 16, max: 64}).withMessage('Invalid password length, must be between 16 and 64 characters')
          .custom(async function verifyPassword(value, { req }){
            const isPasswordValid = await bcrypt.compare(value, req.user.password);
            if(isPasswordValid){
              return Promise.resolve();
            }
            return Promise.reject('Password is invalid');
          })
      ]);
    default:
      return false;
  }
}

module.exports = validate;