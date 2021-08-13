const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');
const uploadDir = path.join(process.cwd(), 'public', 'avatars');

const avatars = async(req, res, next) => {
  if (req.file) {
    // const id = req.user.id;
    console.log('req.user', req.user)
    const { path: pathFile, originalname } = req.file;
    console.log('req.user', pathFile)

    const img = await Jimp.read(pathFile);
    await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER ||
      Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile);

    const useDirectory = path.join(uploadDir);
    //, id);

    try {
      // await fs.rmdir(useDirectory, { recursive: true })
      await fs.mkdir(useDirectory, { recursive: true })
      const fileName = path.join(useDirectory, originalname);

      fs.rename(pathFile, fileName);
      res.status(200).json({
        status: 'success',
        code: 200,
        avatarURL: fileName,
      });
    } catch (error) {
      fs.unlink(pathFile);
      next(error);
    }
  }
}

module.exports = avatars;
