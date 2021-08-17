const { user: service } = require('../../services');
const { schemas } = require('../../utils/validate');
const { nanoid } = require('nanoid');
const { sendMail } = require('../../utils/sendgrid');

const verifyEmail = async(req, res, next) => {
  const { email } = req.body;
  const { error } = schemas.verifySchemaEmail.validate({ email });
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required field email'
    });
  }

  if (email) {
    try {
      const user = await service.getOne({ email });
      console.log(user.verify)
      console.log(user)
      if (!user.verify) {
        const verifyToken = nanoid();
        await service.updateToken(user._id, { verifyToken: verifyToken });
        const mail = {
          to: email,
          subject: 'Подтвердите свой email',
          text: `<a href="https://localhost:3000/api/v1/auth/verify/${verifyToken}">Нажмите для подтверждения email</a>`
        };
        await sendMail(mail);
        res.status(200).json({
          status: 'success',
          code: 200,
          message: 'Verification email sent"',
        });
      } else {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Verification has already been passed'
        });
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = verifyEmail;
