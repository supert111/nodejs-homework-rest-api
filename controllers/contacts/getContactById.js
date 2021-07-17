const { contact } = require('../../services');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const selectContact = await contact.getContactById(contactId);
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: selectContact,
      }
    })
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  };
};

module.exports = getContactById;
