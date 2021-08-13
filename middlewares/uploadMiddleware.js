const path = require('path');
const multer = require('multer');
const TEMP_DIR = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  // limits: {
  //   fileSize: 10000
  // },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 2000000 },
})

module.exports = uploadMiddleware;
