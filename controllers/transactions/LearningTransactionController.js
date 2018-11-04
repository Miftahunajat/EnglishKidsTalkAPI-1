const User = require('../models').User;
const LearningItem = require('../models').LearningItem;

module.exports = {
	
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
	}
	
};