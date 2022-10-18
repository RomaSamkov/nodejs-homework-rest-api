const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");
const { auth, validation, upload } = require("../../middlewares");
const { userJoiSchema } = require("../../schemas");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validation(userJoiSchema.subscriptionSchema),
  auth,
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
