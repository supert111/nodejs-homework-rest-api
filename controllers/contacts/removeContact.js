const { contact } = require('../../services');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const delContact = await contact.removeContact(contactId);
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result: delContact
      }
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  }
};

module.exports = removeContact;
