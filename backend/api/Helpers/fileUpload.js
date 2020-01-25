const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config_env')[env];
const fs = require('fs');

aws.config.update({
    secretAccessKey: config.aws.secret_key,
    accessKeyId: config.aws.access_key_id,
    region: config.aws.region
});
const s3 = new aws.S3();

const uploadUserFile = () => {
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only PDF allowed!'), false);
        }
    };

    return multer({
        fileFilter,
        storage: multerS3({
            acl: 'public-read',
            s3,
            bucket: config.aws.bucketName,
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.originalname});
            },
            key: function (req, file, cb) {
                cb(null, `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/doc-${req.patientId}-${new Date().getTime()}-${file.originalname}`)
            }
        })
    });
};

const uploadFile = (data, key) => {
    return new Promise(function(resolve, reject) {
        let base64data = new Buffer(data, 'binary');
        let params = {
            Bucket: config.aws.bucketName,
            Key: key,
            Body: base64data,
            ACL: "public-read"
        };
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            console.log('Upload Completed ', data);
            resolve(data);
        });
    })
};

module.exports = { uploadFile, uploadUserFile };