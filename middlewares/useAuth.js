const passport = require('passport');
require('../configs/passport-config');

const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      })
    }

    req.user = user;
    next()
  })(req, res, next);
}

module.exports = useAuth;
