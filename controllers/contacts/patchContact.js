const { contact } = require('../../services');
const { schemas } = require('../../utils/validate');

const patchContact = async (req, res, next) => {
  const { body } = req;
  const { error } = schemas.contactPatchSchema.validate(body);
  if (error || Object.keys(body).length === 0) {

    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field'
    })
    return;
  }
  const { contactId } = req.params;

  try {
    const result = await contact.patchContact(contactId, body);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          result,
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  };
};

module.exports = patchContact;
