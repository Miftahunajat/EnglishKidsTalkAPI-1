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
		return Badge
		.create({
			badge_name: req.body.badge_name,
			badge_image: req.body.badge_image
			// badge_name: "Animal master",
			// badge_image: "asdasd/asd/adasd.jpg"
		})
		.then((badge) => res.status(201).send(badge))
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
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
				badge_name: req.body.badge_name || badge.badge_name,
				badge_image: req.body.badge_image || badge.badge_image
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