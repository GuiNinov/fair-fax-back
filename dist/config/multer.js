"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3Config = {
    s3: new aws_sdk_1.default.S3({
        region: 'us-east-2',
        secretAccessKey: process.env.AWS_SECRET_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY,
    }),
    bucket: process.env.AWS_BUCKET,
    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
    acl: 'public-read-write',
    key: (req, file, cb) => {
        crypto_1.default.randomBytes(16, (err, hash) => {
            if (err)
                cb(err);
            const fileName = `${hash.toString('hex')}-${file.originalname}`;
            cb(null, fileName);
        });
    },
};
const storageTypes = {
    localStorage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path_1.default.resolve(__dirname, '..', '..', 'temp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        },
    }),
    s3: (0, multer_s3_1.default)(s3Config),
};
const storageType = process.env.STATIC_STORAGE_TYPE;
const multerObject = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    storage: storageTypes[storageType],
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024 * 10,
        fieldSize: 5 * 1024 * 1024 * 1024 * 10,
    },
    fileFilter: (req, file, cb) => {
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
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    },
};
exports.default = multerObject;
