const { Contact } = require("../schemas/contacts");

const getAll = async (skip, limit, filter) =>
  await Contact.find({}).select({ _v: 0 }).skip(skip).limit(limit).sort(filter);

const getById = async (id) => await Contact.findById(id);

const removeById = async (id) => await Contact.findByIdAndRemove(id);

const add = async ({ name, email, phone }) =>
  await Contact.create({ name, email, phone });

const updateById = async (id, fields) =>
  await Contact.findByIdAndUpdate(id, fields, { new: true });

const updateStatus = async (id, favorite) =>
  await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite: favorite } },
    { new: true }
  );

module.exports = {
  getAll,
  getById,
  removeById,
  add,
  updateById,
  updateStatus,
};
