const User = require('../../models').User;
const LearningItem = require('../../models').LearningItem;

module.exports = {

	addLearningItem(req, res) {
		const getUserPromise = User.findById(req.body.user_id);
		const getLearningItemPromise = LearningItem.findById(req.body.learning_item_id);

		Promise.all([
				getUserPromise,
				getLearningItemPromise
			]).then(([user, learningItem]) => {
				if (user && learningItem) {
					user.addLearningItem(learningItem);
					res.status(200).send({
						msg: 'Learning item successfully added!'
					});
				} else {
					let message = '';
					if (!user)
						message = 'User not found !';
					else if (!learningItem)
						message = 'Learning item not found!';
					return res.status(404).send({
						msg: message
					});
				}
			})
			.catch((error) => res.status(400).send(error));
	}
}