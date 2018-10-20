const User = require('../models').User;
const Badge = require('../models').Badge;
const Inventory = require('../models').Inventory;
const LearningItem = require('../models').LearningItem;
const Challenge = require('../models').Challenge;
const Item = require('../models').Item;
const QuestionCategory = require('../models').QuestionCategory;
const DEFAULT_GIRL_ITEM_IDS = [1,2];
const DEFAULT_BOY_ITEM_IDS = [1,2];
// const DEFAULT_GIRL_ITEM_IDS = [37,38,39];
// const DEFAULT_BOY_ITEM_IDS = [41,42,43];

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
			}, {
				model: LearningItem,
				as: 'learningItems'
			}, {
				model: Challenge,
				as: 'challenges'
			}, {
				model: QuestionCategory,
				as: 'questionCategories'
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
				model: Badge,
				as: 'badges'
			}, {
				model: LearningItem,
				as: 'learningItems'
			}, {
				model: Challenge,
				as: 'challenges'
			}, {
				model: QuestionCategory,
				as: 'questionCategories'
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
		let name = req.body.name;
		let username = req.body.username;
		let password = req.body.password;
		let gender = req.body.gender;
		if (!name || !username || !password || !gender){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} 
		else {
			gender = parseInt(gender);
			return User
			.create({
				name: req.body.name,
				username: req.body.username,
				password: req.body.password,
				gender: gender,
				star_gained: 0,
				xp_gained: 0
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
					.then((user) => {
						let itemTemp = [];
						if (user.gender == 0) itemTemp = DEFAULT_BOY_ITEM_IDS
						else itemTemp = DEFAULT_GIRL_ITEM_IDS
						Item
						.findById(itemTemp[0])
						.then((item1) => {
							Item
							.findById(itemTemp[1])
							.then((item2) => {
								inventory.setItems([item1, item2], {through: {is_active: true}});
								res.status(201).send({'msg' : 'Successfully registered !'});
							})
							.catch((error) => res.status(400).send(error));
						})
						.catch((error) => res.status(400).send(error));
					})
					.catch((error) => res.status(400).send(error));
				})
				.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
		}
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

	addLearningItem(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: LearningItem,
				as: 'learningItems'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			LearningItem
			.findById(req.body.learning_item_id)
			.then((learningItem) => {
				if (!learningItem) {
					return res.status(404).send({
						message: 'Learning Item Not Found',
					});
				}
				user.addLearningItem(learningItem);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},

	addChallenge(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: Challenge,
				as: 'challenges'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			Challenge
			.findById(req.body.challenge_id)
			.then((challenge) => {
				if (!challenge) {
					return res.status(404).send({
						message: 'Challenge Not Found',
					});
				}
				user.addChallenge(challenge);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},

	addQuestionCategory(req, res){
		return User
		.findById(req.body.user_id, {
			include: [{
				model: QuestionCategory,
				as: 'questionCategories'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			QuestionCategory
			.findById(req.body.question_category_id)
			.then((questionCategory) => {
				if (!questionCategory) {
					return res.status(404).send({
						message: 'Question Category Not Found',
					});
				}
				user.addQuestionCategory(questionCategory);
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
				name: req.body.name || user.name,
				username: req.body.username || user.username,
				password: req.body.password || user.password,
				gender: req.body.gender || user.gender,
				star_gained: parseInt(req.body.star_gained) || user.star_gained,
				xp_gained: parseInt(req.body.xp_gained) || user.xp_gained
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