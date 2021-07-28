const { user: service } = require('../../services');

const subscription = async (req, res, next) => {
  const { email, _id, subscription } = req.body;

  try {
    const result = await service.getOne({ email })
    if (!result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email not use'
      });
    }
    const userUpdate = await service.updateUserSubscription(_id, { subscription });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        userUpdate,
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = subscription;
