const { validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;

function createAccessToken(user){
  return jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}

function createRefreshToken(user){
  return jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "30d"});
}

function login(req, res){
    
  // Do user auth here
  const user = {id: 1, name: "admin"}

  const accessToken = createAccessToken(user);
  res.cookie("jid", createRefreshToken(user), {httpOnly: true});
  res.status(200).json({accessToken});

}

async function register(req, res){

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }
  
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username || email.slice(0, 31);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    User.create({
      email: email,
      password: passwordHash,
      username: username
    }, function(err, result){
      if(err){
        return res.status(500).json({error: 500, message: "Failed to create user"});
      }

      return res.status(200).json({error: null, user: result.id});
    });
  } catch (error) {
    res.status(500).json({error: 500, message: "Failed to create user"});
  }
}

async function refreshToken(req, res){
  const token = req.cookies.jid;

  if(!token){
    return res.send({ok: false, accessToken: "missing token"});
  }

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  } catch (error) {
    return res.send({ok: false, accessToken: "failed jwt"});
  }

  const user = await User.findOne({id: req.payload.id});

  // if(!user){
  //   return res.send({ok: false, accessToken: "no user"});
  // }

  // refreh the refresh token
  // res.cookie("jid", createRefreshToken(user), {httpOnly: true});

  return res.send({ok: true, accessToken: createAccessToken(user)});

}

function logout(req, res){
  // handle revoking of access tokens and refresh tokens
}

function secret(req, res){
  res.status(200).json({route: "secret", user: req.payload});
}


module.exports = {
    login,
    register,
    secret,
    refreshToken,
    logout
}