const User = require('../models').User;
const Badge = require('../models').Badge;
const Inventory = require('../models').Inventory;
const UserProfile = require('../models').UserProfile;

module.exports = {
	list(req, res) {
		return User
		.findAll({
			include: [{
				model: Inventory,
				as: 'inventory'
			}, {
				model: UserProfile,
				as: 'userProfile'
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
			}, {
				model: UserProfile,
				as: 'userProfile'
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