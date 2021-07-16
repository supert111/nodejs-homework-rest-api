const { contact } = require('../../services');

const listContacts = async (_req, res) => {
  try {
    const result = await contact.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = listContacts;
