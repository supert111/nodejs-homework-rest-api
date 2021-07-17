const { contact } = require('../../services');

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field favorite',
    });
  }

  try {
    const result = await contact.updateStatusContact(contactId, body);
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

module.exports = updateStatus;
