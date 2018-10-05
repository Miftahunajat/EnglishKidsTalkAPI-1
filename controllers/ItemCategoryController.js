const ItemCategory = require('../models').ItemCategory;
const Item = require('../models').Item;

const fs = require('fs');

module.exports = {
	list(req, res) {
		return ItemCategory
		.findAll({
			include: [{
				model: Item,
				as: 'items'
			}],
			order: [
				['createdAt', 'DESC'],
				[{ model: Item, as: 'items' }, 'createdAt', 'DESC'],
			],
		})
		.then((itemCategories) => res.status(200).send(itemCategories))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return ItemCategory
		.findById(req.params.id, {
			include: [{
				model: Item,
				as: 'items'
			}],
		})
		.then((itemCategory) => {
			if (!itemCategory) {
				return res.status(404).send({
					message: 'Item category not found!',
				});
			}
			return res.status(200).send(itemCategory);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		res.status(200).json({
			'item_category_image': req.file,
			'item_category_name': req.body.item_category_name,
			'item_category_color': req.body.item_category_color
		});
		// return ItemCategory
		// .create({
		// 	item_category_image: req.body.item_category_image,
        //     item_category_name: req.body.item_category_name,
        //     item_category_color: req.body.item_category_color
		// })
		// .then((itemCategory) => res.status(201).send(itemCategory))
		// .catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return ItemCategory
		.findById(req.params.id, {
			include: [{
				model: Item,
				as: 'items'
			}],
		})
		.then(itemCategory => {
			if (!itemCategory) {
				return res.status(404).send({
					message: 'Item category Not Found!',
				});
			}
			return itemCategory
			.update({
                item_category_image: req.body.item_category_image || itemCategory.item_category_image,
                item_category_name: req.body.item_category_name || itemCategory.item_category_name,
                item_category_color: req.body.item_category_color || itemCategory.item_category_color
			})
			.then(() => res.status(200).send(itemCategory))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return ItemCategory
		.findById(req.params.id)
		.then(itemCategory => {
			if (!itemCategory) {
				return res.status(400).send({
					message: 'Item Category Not Found!',
				});
			}
			return itemCategory
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};