const express = require("express");
const { schemaValidation } = require("../../middlewares/validationMiddleware");
const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", getAllContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", schemaValidation, addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", schemaValidation, updateContactController);

module.exports = router;
