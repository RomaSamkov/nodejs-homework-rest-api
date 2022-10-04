const jwt = require("jsonwebtoken");
const db = require("../db/users");
require("dotenv").config();
const isValid = require("mongoose").Types.ObjectId.isValid;

const secret = process.env.SECRET_KEY;

const login = async (email) => await db.login(email);

const register = async (password, email) => await db.register(password, email);

const logout = async (email, token) => await db.logout(email, token);

const addToken = async (payload) => {
  const { id } = payload;
  if (!isValid(id)) return false;
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return await db.token(id, token);
};

const updateUserSubscription = async (id, subscription) => {
  if (!isValid(id)) return false;
  return await db.updateSubscription(id, subscription);
};

module.exports = {
  register,
  login,
  logout,
  addToken,
  updateUserSubscription,
};
