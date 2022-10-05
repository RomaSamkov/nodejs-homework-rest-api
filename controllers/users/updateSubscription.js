const service = require("../../service/users");
const createError = require("http-errors");
const { Unauthorized } = require("http-errors");

const updateSub = async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;
  const subscriptionTypes = ["starter", "pro", "business"];
  if (!subscriptionTypes.includes(subscription)) {
    next(createError(400, "Wrong subscription name"));
    return;
  }
  const updatedResult = await service.updateSubscription(userId, subscription);
  if (updatedResult) {
    res.status(200).json({
      data: {
        user: updatedResult,
      },
    });
  } else {
    throw new Unauthorized("Unuathorized");
  }
};

module.exports = updateSub;
