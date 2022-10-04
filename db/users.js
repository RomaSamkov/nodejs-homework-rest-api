const { User } = require("../schemas/users");

const login = async (email) => {
  await User.findOne({ email });
};

const register = async (password, email) => {
  const newUser = new User({ email, password });
  const user = await newUser.save();
  return user;
};

const logout = async (email, token) => {
  await User.findOneAndUpdate({ email: email }, { $unset: { token: token } });
};

const token = async (id, token) => {
  await User.findByIdAndUpdate(
    { _id: id },
    { $unset: { token: token } },
    { new: true }
  );
};

const updateSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(
    { _id: id },
    { $unset: { subscription: subscription } },
    { new: true }
  ).select({ email: 1, subscription: 1 });
};

module.exports = {
  register,
  login,
  logout,
  token,
  updateSubscription,
};
