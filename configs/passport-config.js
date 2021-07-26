const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const { user: service } = require('../services')

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
}

const jwtStrategy = new Strategy(settings, async (payload, done) => {
  try {
    const user = await service.getById(payload.id);
    if (!user) {
      throw new Error('Not found');
    }
    done(null, user);
  } catch (error) {
    done(error)
  }
});

passport.use('jwt', jwtStrategy);
