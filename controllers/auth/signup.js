const { user: service } = require('../../services');
const { schemas } = require('../../utils/validate');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schemas.signupSchema.validate({ email, password });

  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
    return;
  }

  try {
    const result = await service.getOne({ email });
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use'
      });
    }
    const userReg = await service.add({ email, password });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription: userReg.subscription,
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
