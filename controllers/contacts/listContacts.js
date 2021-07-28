const { contact } = require('../../services');

const listContacts = async (req, res) => {
  try {
    const result = await contact.listContacts(req.query);
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
