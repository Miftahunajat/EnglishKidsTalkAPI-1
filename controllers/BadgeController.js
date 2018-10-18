const Badge = require('../models').Badge;
const User = require('../models').User;

module.exports = {
	list(req, res) {
		return Badge
		.findAll({
			include: [{
				model: User,
				as: 'users'
			}],
			order: [
				['createdAt', 'DESC'],
				[{ model: User, as: 'users' }, 'createdAt', 'DESC'],
			],
		})
		.then((badges) => res.status(200).send(badges))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return Badge
		.findById(req.params.id, {
			include: [{
				model: User,
				as: 'users'
			}],
		})
		.then((badge) => {
			if (!badge) {
				return res.status(404).send({
					message: 'Badge not found!',
				});
			}
			return res.status(200).send(badge);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		let badge_name = req.body.badge_name;
		let badge_image = req.file.url;
		if (!badge_name || !badge_image){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
			return Badge
			.create({
				badge_name: badge_name,
				badge_image: badge_image
			})
			.then((badge) => res.status(201).send(badge))
			.catch((error) => res.status(400).send(error));
		}
	},
	
	update(req, res) {
		let badge_name = req.body.badge_name;
		let badge_image = null;
		if (!badge_name || !badge_image){
			badge_image = req.file.url
		}
		return Badge
		.findById(req.params.id, {
			include: [{
				model: User,
				as: 'users'
			}],
		})
		.then(badge => {
			if (!badge) {
				return res.status(404).send({
					message: 'Badge Not Found!',
				});
			}
			return badge
			.update({
				badge_name: badge_name || badge.badge_name,
				badge_image: badge_image || badge.badge_image
			})
			.then(() => res.status(200).send(badge))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return Badge
		.findById(req.params.id)
		.then(badge => {
			if (!badge) {
				return res.status(400).send({
					message: 'Badge Not Found!',
				});
			}
			return badge
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};