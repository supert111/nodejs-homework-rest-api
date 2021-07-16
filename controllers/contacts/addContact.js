const { contact } = require('../../services');
const { schemas } = require('../../utils/validate');

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await contact.addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (err) {
    const { error } = schemas.contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
    }
    next(err);
  }
}

module.exports = addContact;
