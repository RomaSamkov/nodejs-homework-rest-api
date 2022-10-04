const express = require("express");
const { schemaValidation } = require("../../middlewares/userValidation");
const handleCatchErrors = require("../../middlewares/errorHandler");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", schemaValidation, handleCatchErrors(ctrl.register));

module.exports = router;
