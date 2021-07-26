const { user: service } = require('../../services');
const { schemas } = require('../../utils/validate');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schemas.signupSchema.validate({ email, password });

  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }
    const token = await service.login({ user });
    const id = user._id;
    const result = await service.updateToken(id, { token });
    res.json({
      status: 'success',
      code: 200,
      data: {
        token: result.token,
        user: {
          email: result.email,
          subscription: result.subscription,
        }
      },
    })
  } catch (error) {
    next(error);
  }
}

module.exports = login;
