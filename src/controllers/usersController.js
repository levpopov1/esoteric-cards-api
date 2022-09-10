const User = require('../models/user');
const API = require('../middleware/apiKeys');

function getAllUsers(req, res) {
  res.status(200).json(req.items);
}

function getOneUser(req, res) {
  res.status(200).json(req.item);
}

async function registerUser(req, res, next) {
  let origin = req.headers.host;

  let acc = {
    api_key: API.generateKey(),
    host: origin,
    usage: {
      requests: 0,
      lastAccessTime: Date.now(),
    },
  };

  try {
    const newUser = await User.create(acc);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  registerUser,
};
