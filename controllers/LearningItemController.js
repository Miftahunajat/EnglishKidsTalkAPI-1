const LearningItem = require('../models').LearningItem;
const LearningTopic = require('../models').LearningTopic;
const User = require('../models').User;

module.exports = {
	list(req, res) {
		return LearningItem
		.findAll({
			include: [{
				model: LearningTopic,
				as: 'learningTopic'
			}, {
                model: User,
                as: 'users'
            }],
			order: [
				['createdAt', 'DESC'],
				[{ model: User, as: 'users' }, 'createdAt', 'DESC'],
			],
		})
		.then((learningItems) => res.status(200).send(learningItems))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return LearningItem
		.findById(req.params.id, {
			include: [{
				model: LearningTopic,
				as: 'learningTopic'
			}, {
                model: User,
                as: 'users'
            }],
		})
		.then((learningItem) => {
			if (!learningItem) {
				return res.status(404).send({
					message: 'Learning item not found!',
				});
			}
			return res.status(200).send(learningItem);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		let learning_topic_id = req.body.learning_topic_id;
		let learning_item_xp = req.body.learning_item_xp;
		let learning_item_title = req.body.learning_item_title;
		let learning_item_image = req.file.url;
		if (!learning_topic_id || !learning_item_xp || !learning_item_title || !learning_item_image){
			res.status(404).send({'msg': 'Field cannot be null!'});
		}
		return LearningItem
		.create({
			learning_topic_id: learning_topic_id,
			learning_item_xp: learning_item_xp,
			learning_item_title: learning_item_title,
			learning_item_image: learning_item_image
		})
		.then((learningItem) => res.status(201).send(learningItem))
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		let learning_topic_id = req.body.learning_topic_id;
		let learning_item_xp = req.body.learning_item_xp;
		let learning_item_title = req.body.learning_item_title;
		let learning_item_image = null;
		if (req.file){
			learning_item_image = req.file.url;
		}
		return LearningItem
		.findById(req.params.id, {
			include: [{
				model: LearningTopic,
				as: 'learningTopic'
			}],
		})
		.then(learningItem => {
			if (!learningItem) {
				return res.status(404).send({
					message: 'Learning item Not Found!',
				});
			}
			return learningItem
			.update({
				learning_topic_id: learning_topic_id || learningItem.learning_topic_id,
				learning_item_xp: learning_item_xp || learningItem.learning_item_xp,
				learning_item_title: learning_item_title || learningItem.learning_item_title,
				learning_item_image: learning_item_image || learningItem.learning_item_image
			})
			.then(() => res.status(200).send(learningItem))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return LearningItem
		.findById(req.params.id)
		.then(learningItem => {
			if (!learningItem) {
				return res.status(400).send({
					message: 'Learning item Not Found!',
				});
			}
			return learningItem
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};