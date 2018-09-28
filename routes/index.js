const express = require('express');
const router = express.Router();

const badgeController = require('../controllers').badge;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({
        msg: 'It workssss!'
    });
});

router.get('/api/badges', badgeController.list);
router.get('/api/badges/:id', badgeController.getById);
router.post('/api/badges', badgeController.add);
router.put('/api/badges/:id', badgeController.update);
router.delete('/api/badges/:id', badgeController.delete);

module.exports = router;
