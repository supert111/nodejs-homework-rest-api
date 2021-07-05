const contacts = require('../../data/contacts.json');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(contact => contact.id.toString() === contactId.toString());
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  }
  const delContact = contacts.filter(contact => contact.id.toString() !== contactId.toString());
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result: delContact
    }
  })
};

module.exports = removeContact;
