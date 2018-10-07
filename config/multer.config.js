const multer = require('multer');
const storage = require('./cloudinary-storage.config');

// Saving file to local storage
// const storage = multer.diskStorage({
// 	destination: 'static/assets/uploads',
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + file.originalname);
// 	}
// });

const upload = multer({
    storage: storage
});

module.exports = upload;