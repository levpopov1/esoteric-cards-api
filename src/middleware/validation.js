const { body } = require('express-validator');
const User = require('../models/user');


function validate(target){
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
      return [
        body('email', 'Missing email').exists(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Missing password').exists(),
        body('password', 'Invalid password length, must be between 16 and 64 characters').isLength({min: 16, max: 64}),
        body('email').custom(async function checkUserExists(value, { req }){
          const userExists = await User.findOne({email: value});
          if(userExists){
            return Promise.resolve(req.user = userExists);
          }
          return Promise.reject('User does not exist');
        })
      ]
    default:
      return false;
  }
}

module.exports = validate;