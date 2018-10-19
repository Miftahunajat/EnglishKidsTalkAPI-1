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
        let item_category_id = req.body.item_category_id;
        let name = req.body.name;
        let item_desc = req.body.item_desc;
        let star = req.body.star;
        let gender = req.body.gender;
        let image = req.files["image"][0].url;
        let snippet = req.files["snippet"][0].url;
        if (!item_category_id || !name || !item_desc || !star || !gender || !image || !snippet){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
            return Item
            .create({
                item_category_id: item_category_id,
                name: name,
                item_desc: item_desc,
                star: parseInt(star),
                gender: parseInt(gender),
                image: image,
                snippet: snippet
            })
            .then((item) => res.status(201).send(item))
            .catch((error) => res.status(400).send(error));
        }
    },
    
    update(req, res) {
        let item_category_id = req.body.item_category_id;
        let name = req.body.name;
        let item_desc = req.body.item_desc;
        let star = req.body.star;
        let gender = parseInt(req.body.gender);
        let image = null;
        let snippet = null;
        if (req.files["image"]){
            image = req.files["image"][0].url;
        }
        if (req.files["snippet"]){
            snippet = req.files["snippet"][0].url;
        }
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
                item_category_id: item_category_id || item.item_category_id,
                name: name || item.name,
                item_desc: item_desc || item.item_desc,
                star: star || item.star,
                gender: gender || item.gender,
                image: image || item.image,
                snippet: snippet || item.snippet
            })
            .then(() => res.status(200).send(item))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
        // res.send(req.body);
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
