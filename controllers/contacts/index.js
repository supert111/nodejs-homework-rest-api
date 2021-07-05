const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const patchContact = require('./patchContact');
const removeContact = require('./removeContact');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  patchContact,
  removeContact
}
