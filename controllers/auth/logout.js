const { user: service } = require('../../services');

const logout = async(req, res, next) => {
  try {
    await service.updateToken(req.user._id, { token: null });
    res.json({
      status: 'No Content',
      code: 204,
      message: 'No Content'
    })
    // res.json({
    //   status: 'success',
    //   code: 200,
    //   message: 'Logout success'
    // })
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
