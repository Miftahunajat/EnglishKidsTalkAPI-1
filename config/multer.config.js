const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
	destination: 'static/assets/uploads',
	filename: function(req, file, callback){
		crypto.pseudoRandomBytes(16, function(err, raw){
			if (err) return callback(err);
			callback(null, raw.toString('hex'), path.extname(file.originalname));
		});
	}
});
const upload = multer({
    storage: storage
});

module.exports = upload;