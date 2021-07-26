const express = require('express');
const router = express.Router();
const { auth: ctrl } = require('../../controllers');
const useAuth = require('../../middlewares');

router
  .post('/signup', express.json(), ctrl.signup)
  .post('/login', useAuth, express.json(), ctrl.login)
  .post('/logout', useAuth, express.json(), ctrl.logout)
  .get('/current', useAuth, ctrl.current)
  .patch('', express.json(), ctrl.subscription)
module.exports = router;
