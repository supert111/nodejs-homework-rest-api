const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET_KEY;

const getOne = (filter) => {
  return User.findOne(filter);
};

const add = ({ password, ...other }) => { // other = {email, verifyToken}
  const newUser = new User(other);
  newUser.setPassword(password);
  return newUser.save();
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // return User.create({email, password: hashPassword});
}

const login = ({ user }) => {
  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

const updateToken = (id, { token }) => {
  return User.findByIdAndUpdate({ _id: id }, { token }, { new: true });
}

const updateUserSubscription = (id, { subscription }) => {
  return User.findByIdAndUpdate({ _id: id }, { subscription }, { new: true });
}

const getById = (id) => User.findById(id);

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo)
}

module.exports = {
  getOne,
  add,
  login,
  updateToken,
  getById,
  updateUserSubscription,
  updateById,
}
