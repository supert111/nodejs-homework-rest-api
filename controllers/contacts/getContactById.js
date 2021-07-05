const contacts = require('../../data/contacts.json');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectContact = contacts.find(contact => contact.id.toString() === contactId.toString());
  if (!selectContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  };

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact,
    }
  })
}

module.exports = getContactById;
