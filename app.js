const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('./configs/passport-config');
const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static('public'));

// app.use(express.json());

app.use('/api/v1/users', authRouter);
app.use('/api/v1/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  });
})

app.use((error, req, res, next) => {
  const { code = 500, message = 'Server error' } = error;
  res.status(code).json({
    status: 'fail',
    code,
    message
  });
})

module.exports = app;
