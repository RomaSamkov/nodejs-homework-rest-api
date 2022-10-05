const service = require("../../service/users");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await service.getUserByEmail(email);
  if (!user) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (!isSamePassword) {
    next(createError(401, "Email or password is wrong"));
    return;
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const updatedUser = await service.addToken(payload);
  res.status(200).json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = login;
