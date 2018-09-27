const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET req to /badges'
    });
});

router.post('/', (req, res, next) => {
    const badge = {
        badge_name: req.body.badge_name,
        badge_image: req.body.badge_image
    };
    res.status(201).json({
        message: 'Handling POST req to /badges',
        createdBadge: badge
    });
});

router.get('/:badgeId', (req, res, next) => {
    const badgeId = req.params.badgeId;
    res.status(200).json({
        message: 'Bagde detail',
        data: badgeId
    });
});

router.patch('/:badgeId', (req, res, next) => {
    res.status(200).json({
        message: 'Badge updated!'
    })
});

router.delete('/:badgeId', (req, res, next) => {
    res.status(200).json({
        message: 'Badge deleted!'
    });
});

module.exports = router;