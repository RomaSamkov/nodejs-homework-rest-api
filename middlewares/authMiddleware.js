const jwt = require("jsonwebtoken");
const { User } = require("../schemas/users");
const createError = require("http-errors");
const { Unauthorized } = require("http-errors");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (tokenType !== "Bearer") {
    next(createError(400, "Token type is wrong. Must be a Bearer"));
    return;
  }
  try {
    const user = jwt.decode(token, secret);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    const searchUser = await User.findById({ _id: user.id });
    if (searchUser.token !== token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = searchUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
