const express = require("express");
const { validationMiddleware } = require("../../middlewares/userValidation");
const { authMiddleware } = require("../../middlewares/tokenValidation");
const handleCatchErrors = require("../../middlewares/errorHandler");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validationMiddleware, handleCatchErrors(ctrl.register));

router.post("/login", validationMiddleware, handleCatchErrors(ctrl.login));

router.get("/logout", authMiddleware, handleCatchErrors(ctrl.logout));

router.get("/current", authMiddleware, handleCatchErrors(ctrl.getCurrent));

router.patch("/:userId", handleCatchErrors(ctrl.updateSubscription));

module.exports = router;
