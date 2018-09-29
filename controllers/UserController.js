const User = require('../models').User;
const Inventory = require('../models').Inventory;

module.exports = {
	list(req, res) {
		return User
		.findAll({
			include: [{
				model: Inventory,
				as: 'inventory'
			}],
			order: [
				['createdAt', 'DESC'],
				[{ model: Inventory, as: 'inventory' }, 'createdAt', 'DESC'],
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
			profile_id: req.body.profile_id,
            inventory_id: req.body.inventory_id,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
		})
		.then((user) => res.status(201).send(user))
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
                profile_id: req.body.profile_id || user.profile_id,
                inventory_id: req.body.inventory_id || user.inventory_id,
                name: req.body.name || user.name,
                username: req.body.username || user.username,
                password: req.body.password || user.password
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