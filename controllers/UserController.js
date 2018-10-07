const User = require('../models').User;
const Badge = require('../models').Badge;
const Inventory = require('../models').Inventory;

module.exports = {
	list(req, res) {
		return User
		.findAll({
			include: [{
				model: Inventory,
				as: 'inventory'
			}, {
				model: Badge,
				as: 'badges'
			}],
			order: [
				['createdAt', 'DESC']
			],
		})
		.then((users) => res.status(200).send(users))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return User
		.findById(req.params.id, {
			include: [{
				model: Inventory,
				as: 'inventory'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found!',
				});
			}
			return res.status(200).send(user);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		return User
		.create({
			inventory_id: req.body.inventory_id,
            name: req.body.name,
            username: req.body.username,
			password: req.body.password,
			gender: req.body.gender,
			star_gained: req.body.star_gained,
			xp_gained: req.body.xp_gained,
			avatar: req.body.avatar
		})
		.then((user) => {
			Inventory
			.create({
				user_id: user.id
			})
			.then((inventory) => {
				user
				.update({
					inventory_id: inventory.id
				})
				.then(() => res.status(201).send(user))
				.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},

	login(req, res) {
		res.status(200).json({'msg': 'User logged!'});
	},

	addBadge(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: Badge,
				as: 'badges'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			Badge
			.findById(req.body.badge_id)
			.then((badge) => {
				if (!badge) {
					return res.status(404).send({
						message: 'Badge Not Found',
					});
				}
				user.addBadge(badge);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return User
		.findById(req.params.id, {
			include: [{
				model: Inventory,
				as: 'inventory'
			}],
		})
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found!',
				});
			}
			return user
			.update({
                inventory_id: req.body.inventory_id || user.inventory_id,
                name: req.body.name || user.name,
                username: req.body.username || user.username,
                password: req.body.password || user.password,
                gender: req.body.gender || user.gender,
                star_gained: req.body.star_gained || user.star_gained,
				xp_gained: req.body.xp_gained || user.xp_gained,
				avatar: req.body.avatar || user.avatar
			})
			.then(() => res.status(200).send(user))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return User
		.findById(req.params.id)
		.then(user => {
			if (!user) {
				return res.status(400).send({
					message: 'User Not Found!',
				});
			}
			return user
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};