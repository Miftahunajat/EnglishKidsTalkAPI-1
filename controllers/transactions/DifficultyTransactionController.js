const User = require('../../models').User;
const QuestionDifficulty = require('../../models').QuestionDifficulty;

module.exports = {

	addQuestionDifficulty(req, res) {
		const getUserPromise = User
			.findById(req.params.id);

		const getQuestionDifficultyPromise = QuestionDifficulty
			.findById(req.body.question_difficulty_id);

		Promise.all([
				getUserPromise,
				getQuestionDifficultyPromise
			])
			.then(([user, questionDifficulty]) => {
				if (user && questionDifficulty) {
					if (user.star_gained < questionDifficulty.star_needed) {
						return res.status(400).send({
							msg: 'Failed! Star not enough!'
						});
					} else {
						user.addQuestionDifficulty(questionDifficulty);
						user.update({
							star_gained: user.star_gained - questionDifficulty.star_needed
						});
						return res.status(200).send(user);
					}
				} else {
					let message = '';
					if (!user)
						message = 'User not found!'
					else if (!questionDifficulty)
						message = 'Question difficulty not found!'
					return res.status(400).send({
						msg: message
					});
				}
			})
			.catch((error) => res.status(400).send(error));
	}
};