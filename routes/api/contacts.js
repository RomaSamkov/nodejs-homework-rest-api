const express = require("express");
const { schemaValidation } = require("../../middlewares/validationMiddleware");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", schemaValidation, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", schemaValidation, updateContact);

module.exports = router;
