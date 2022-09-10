const express = require("express");

const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.status(200).json({ status: "success", code: 200, data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  contact
    ? res.status(200).json({ status: "success", data: contact })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json({ status: "success", data: contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.removeContact(contactId);
  contact
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, req.body);
  contact
    ? res.status(200).json({ data: contact })
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
