const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET req to /item-categories'
    });
});

router.post('/', (req, res, next) => {
    const itemCategory = {
        item_category_image: req.body.item_category_image,
        item_category_name: req.body.item_category_name,
        item_category_color: req.body.item_category_color
    };
    res.status(201).json({
        message: 'Handling POST req to /item-categories',
        createdBadge: itemCategory
    });
});

router.get('/:itemCategoryId', (req, res, next) => {
    const itemCategoryId = req.params.itemCategoryId;
    res.status(200).json({
        message: 'Item category details',
        data: itemCategoryId
    });
});

router.patch('/:itemCategoryId', (req, res, next) => {
    const itemCategory = {
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