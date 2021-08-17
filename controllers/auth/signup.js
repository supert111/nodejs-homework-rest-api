const { nanoid } = require('nanoid');
const { user: service } = require('../../services');
const { schemas } = require('../../utils/validate');
const { sendMail } = require('../../utils/sendgrid');

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
    const verifyToken = nanoid();
    const userReg = await service.add({ email, password, verifyToken });
    const mail = {
      // to: email,
      to: 'sportmyk@meta.ua',
      subject: 'Подтвердите свой email',
      text: `<a href="https://localhost:3000/api/v1/auth/verify/${verifyToken}">Нажмите для подтверждения email</a>`
    };
    await sendMail(mail);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription: userReg.subscription,
        }
      },
      message: 'success signup. Verify email',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
