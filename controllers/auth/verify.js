const { user: service } = require('../../services');

const verify = async(req, res, next) => {
  const verifyToken = req.params.verificationToken;

  try {
    const user = await service.getOne({ verifyToken });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found'
      });
    }
    await service.updateById(user._id, { verify: true, verifyToken: null, });
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful'
    });
    res.send('<h2>Verification successful</h2>')
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
