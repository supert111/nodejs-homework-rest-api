const contacts = require('../../data/contacts.json');
const { schemas } = require('../../utils/validate');

const patchContact = async (req, res) => {
  const { error } = schemas.contactPatchSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field'
    })
    return;
  }
  const { contactId } = req.params;
  const index = contacts.findIndex(contact => contact.id.toString() === contactId.toString());
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  };

  contacts[index] = { ...contacts[index], ...req.body, id: contactId };
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    }
  })
};

module.exports = patchContact;
