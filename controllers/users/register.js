const service = require("../../service/users");
const createError = require("http-errors");

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await service.login(email);
  if (user) {
    next(createError(404, "Email in use"));
    return;
  }
  const newUser = await service.register(password, email);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = register;
