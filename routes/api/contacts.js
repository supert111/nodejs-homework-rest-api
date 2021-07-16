const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');

router
  .get('/', ctrl.listContacts)
  .get('/:contactId', ctrl.getContactById)
  .post('/', express.json(), ctrl.addContact)
  .delete('/:contactId', ctrl.removeContact)
  .put('/:contactId', express.json(), ctrl.updateContact)
  .patch('/:contactId', express.json(), ctrl.patchContact)
  .patch('/:contactId/favorite', express.json(), ctrl.updateStatus)

module.exports = router;
