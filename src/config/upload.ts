import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  path: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = file.originalname + "-" + fileHash;

      return callback(null, filename);
    }
  })
};
