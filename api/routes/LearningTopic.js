const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET req to /learning-topic'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST req to /learning-topic',
        createdProduct: product
    });
});

router.get('/:learningTopicId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:learningTopicId', (req, res, next) => {
    res.status(200).json({
        message: 'Learning-topic updated!'
    })
});

router.delete('/:learningTopicId', (req, res, next) => {
    res.status(200).json({
        message: 'Learning-topic deleted!'
    });
});

module.exports = router;