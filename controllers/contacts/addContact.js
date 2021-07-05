const { v4 } = require('uuid');
const { schemas } = require('../../utils/validate');
const contacts = require('../../data/contacts.json');

const addContact = async (req, res) => {
  const { error } = schemas.contactsSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required name field'

    })
    return;
  }
  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: contacts,
    }
  })
}

module.exports = addContact;
