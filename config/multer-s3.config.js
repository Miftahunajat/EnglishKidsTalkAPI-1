const multerS3 = require('multer-s3');
const aws = require('../config/aws.config');
const s3 = new aws.S3();

const storage = multerS3({
    s3: s3,
    bucket: 'tdn',
    key: function(req, file, cb){
        console.log(file);
        cb(null, Date.now() + file.originalname)
    }
});

module.exports = storage;