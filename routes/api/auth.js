const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const { useAuth, uploadMiddleware } = require('../../middlewares');

router
  .post('/signup', express.json(), ctrl.signup)
  .post('/login', useAuth, express.json(), ctrl.login)
  .post('/logout', useAuth, express.json(), ctrl.logout)
  .get('/current', useAuth, ctrl.current)
  .patch('', express.json(), ctrl.subscription)
  .patch('/avatars', useAuth, uploadMiddleware.single('file'), express.json(), ctrl.avatars)
  .get('/verify/:verificationToken', ctrl.verify)
  .post('/verify', express.json(), ctrl.verifyEmail)
module.exports = router;
