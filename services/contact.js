const { Contact } = require('../models');

const listContacts = () => {
  return Contact.find({});
}

const addContact = (body) => {
  return Contact.create(body);
}

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
}

const patchContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
}

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
}

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
}

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  patchContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
