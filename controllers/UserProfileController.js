const User = require('../models').User;
const UserProfile = require('../models').UserProfile;

module.exports = {
	list(req, res) {
		return UserProfile
		.findAll({
			include: [
			// {
			// 	model: Item,
			// 	as: 'items'
			// }, 
			{
                model: User,
                as: 'users'
            }],
			order: [
				['createdAt', 'DESC'],
				// [{ model: Item, as: 'items' }, 'createdAt', 'DESC'],
				// [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
			],
		})
		.then((inventories) => res.status(200).send(inventories))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return UserProfile
		.findById(req.params.id, {
			// include: [
            // {
			// 	model: Item,
			// 	as: 'items'
            // }, 
            // {
            //     model: User,
            //     as: 'users'
            // }],
		})
		.then((profile) => {
			if (!profile) {
				return res.status(404).send({
					message: 'UserProfile not found!',
				});
			}
			return res.status(200).send(profile);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		return UserProfile
		.create({
			user_id: req.body.user_id,
			gender: req.body.gender,
			star_gained: req.body.star_gained,
			xp_gained: req.body.xp_gained,
		})
		.then((userProfile) => res.status(201).send(userProfile))
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return UserProfile
		.findById(req.params.id, {
			// include: [
            // {
			// 	model: Item,
			// 	as: 'items'
            // }, 
            // {
            //     model: User,
            //     as: 'users'
            // }],
		})
		.then(userProfile => {
			if (!userProfile) {
				return res.status(404).send({
					message: 'UserProfile Not Found!',
				});
			}
			return userProfile
			.update({
                user_id: req.body.user_id || userProfile.user_id,
                gender: req.body.gender || userProfile.gender,
                star_gained: req.body.star_gained || userProfile.star_gained,
                xp_gained: req.body.xp_gained || userProfile.xp_gained,
			})
			.then(() => res.status(200).send(userProfile))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return UserProfile
		.findById(req.params.id)
		.then(userProfile => {
			if (!userProfile) {
				return res.status(400).send({
					message: 'UserProfile Not Found!',
				});
			}
			return userProfile
			.destroy()
			.then(() => res.status(204).send())
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};