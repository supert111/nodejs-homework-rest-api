const app = require('../app');
const mongoose = require('mongoose');
// const dotenv = require("dotenv");
// dotenv.config();
require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Database connection successful');
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
})
  .catch(error => {
    console.log(error, 'process completed');
    process.exit(1);
  })
