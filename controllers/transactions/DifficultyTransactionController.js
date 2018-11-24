const User = require('../../models').User;
const QuestionDifficulty = require('../../models').QuestionDifficulty;

module.exports = {
	
	addQuestionDifficulty(req, res){
		let message = '';
		const userPromise = User
		.findById(req.params.id);
		
		const questionDifficultyPromise = QuestionDifficulty
		.findById(req.body.question_difficulty_id);
		
		Promise.all([
			userPromise,
			questionDifficultyPromise
		])
		.then(([user, questionDifficulty]) => {
			if (user && questionDifficulty) {
				user.addQuestionDifficulty(questionDifficulty);
				return res.status(200).send(user)
			}
			else {
				if (!user)
					message = 'User not found!'
				else if (!questionDifficulty)
					message = 'Question difficulty not found!'
				return res.status(404).send(message);
			}
		})
		.catch((error) => res.status(400).send(error));
	}
	
};