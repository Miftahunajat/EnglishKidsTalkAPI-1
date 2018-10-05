const Item = require('../models').Item;
const ItemCategory = require('../models').ItemCategory;
const Inventory = require('../models').Inventory;

module.exports = {
    list(req, res) {
        return Item
        .findAll({
            include: [{
                model: ItemCategory,
                as: 'itemCategory'
            },
            {
                model: Inventory,
                as: 'inventories'
            }
        ],
            order: [
                ['createdAt', 'DESC'],
                [{ model: Inventory, as: 'inventories' }, 'createdAt', 'DESC'],
            ],
        })
        .then((items) => res.status(200).send(items))
        .catch((error) => { res.status(400).send(error); });
    },
    
    getById(req, res) {
        return Item
        .findById(req.params.id, {
            include: [{
                model: ItemCategory,
                as: 'itemCategory'
            },{
                model: Inventory,
                as: 'inventories'
            }],
        })
        .then((item) => {
            if (!item) {
                return res.status(404).send({
                    message: 'Item Not Found',
                });
            }
            return res.status(200).send(item);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    add(req, res) {
        return Item
        .create({
            item_category_id: req.body.item_category_id,
            name: req.body.name,
            item_desc: req.body.item_desc,
            star: req.body.star,
            image: req.body.image,
            x_coordinate: req.body.x_coordinate,
            y_coordinate: req.body.y_coordinate,
        })
        .then((item) => res.status(201).send(item))
        .catch((error) => res.status(400).send(error));
    },
    
    update(req, res) {
        return Item
        .findById(req.params.id, {
            include: [{
                model: ItemCategory,
                as: 'itemCategory'
            },{
                model: Inventory,
                as: 'inventories'
            }],
        })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: 'Item Not Found',
                });
            }
            return item
            .update({
                student_name: req.body.student_name || itemCategory.student_name,
            })
            .then(() => res.status(200).send(item))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    
    delete(req, res) {
        return Item
        .findById(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(400).send({
                    message: 'Item Not Found',
                });
            }
            return item
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};
