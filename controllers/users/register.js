const service = require("../../service/users");
const createError = require("http-errors");

const registration = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await service.getUserByEmail(email);
  if (user) {
    next(createError(404, "Email in use"));
    return;
  }
  const newUser = await service.userSignup(password, email);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = registration;
