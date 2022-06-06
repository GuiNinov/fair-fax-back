import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3Config: any = {
  s3: new aws.S3({
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
  }),
  bucket: process.env.AWS_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read-write',
  key: (req: any, file: any, cb: any) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  },
};

const storageTypes: any = {
  localStorage: multer.diskStorage({
    destination: (req, file, cb: any) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (req, file: any, cb: any) => {
      crypto.randomBytes(16, (err: any, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),

  s3: multerS3(s3Config),
};

const storageType: any = process.env.STATIC_STORAGE_TYPE;
console.log(storageType);
const multerObject: any = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: storageTypes[storageType],
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024 * 10,
    fieldSize: 5 * 1024 * 1024 * 1024 * 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      'image/gif',
      'text/plain',
      'text/html',
      'image/svg+xml',
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/bmp',
      'image/webp',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};

export default multerObject;
