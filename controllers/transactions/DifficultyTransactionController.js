const User = require('../models').User;
const QuestionDifficulty = require('../models').QuestionDifficulty;

module.exports = {
	
	addQuestionDifficulty(req, res){
		return User
		.findById(req.body.user_id, {
			include: [{
				model: QuestionDifficulty,
				as: 'questionDifficulties'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			QuestionDifficulty
			.findById(req.body.question_difficulty_id)
			.then((questionDifficulty) => {
				if (!questionDifficulty) {
					return res.status(404).send({
						message: 'Question Category Not Found',
					});
				}
				user.addQuestionDifficulty(questionDifficulty);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	}
	
};