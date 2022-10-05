const service = require("../../service/users");

const logout = async (req, res, next) => {
  const { token, email } = req.user;
  await service.userLogout(email, token);
  res.status(204).json({});
};

module.exports = logout;
