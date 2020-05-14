import multer, { StorageEngine } from 'multer';
import path from 'path';
import ctypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;

  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    s3: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = ctypto.randomBytes(10).toString('HEX');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    s3: {
      bucket: process.env.STORAGE_BUCKET,
    },
  },
} as IUploadConfig;
