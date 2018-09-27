const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET req to /items'
    });
});

router.post('/', (req, res, next) => {
    const item = {
        item_category_id: req.body.item_category_id,
        name: req.body.name,
        item_desc: req.body.item_desc,
        star: req.body.star,
        image: req.body.image,
        x_coordinate: req.body.x_coordinate,
        y_coordinate: req.body.y_coordinate
    };
    res.status(201).json({
        message: 'Handling POST req to /items',
        createdBadge: itemCategory
    });
});

router.get('/:itemId', (req, res, next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: 'Item category details',
        data: itemId
    });
});

router.patch('/:itemId', (req, res, next) => {
    const item = {
        item_category_image: req.body.item_category_image,
        item_category_name: req.body.item_category_name,
        item_category_color: req.body.item_category_color
    };
    res.status(200).json({
        message: 'Item-categories updated!',
        data: itemCategory
    });
});

router.delete('/:itemCategoryId', (req, res, next) => {
    const itemCategoryId = req.params.itemCategoryId;
    res.status(200).json({
        message: 'Item-categories deleted!'
    });
});

module.exports = router;