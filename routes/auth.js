const router = require('express').Router();
const upload = require('../config/multer.config');

const authController = require('../controllers').AuthController;

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(), authController.login);

module.exports = router;