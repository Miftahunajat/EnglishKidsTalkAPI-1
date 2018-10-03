const Challenge = require('../models').Challenge;
const LearningTopic = require('../models').LearningTopic;
const QuestionDifficulty = require('../models').QuestionDifficulty;

module.exports = {
	list(req, res) {
		return QuestionDifficulty
		.findAll({
			// include: [{
			// 	model: Challenge,
			// 	as: 'challenges'
			// }, {
			// 	model: LearningTopic,
			// 	as: 'learningTopics'
			// }],
			order: [
				['createdAt', 'DESC'],
				// [{ model: Challenge, as: 'challenges' }, 'createdAt', 'DESC'],
				// [{ model: LearningTopic, as: 'learningTopics' }, 'createdAt', 'DESC'],
			],
		})
		.then((questionDifficulties) => res.status(200).send(questionDifficulties))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return QuestionDifficulty
		.findById(req.params.id, {
			// include: [{
			// 	model: Challenge,
			// 	as: 'challenges'
			// }, {
			// 	model: LearningTopic,
			// 	as: 'learningTopics'
			// }],
		})
		.then((questionDifficulty) => {
			if (!questionDifficulty) {
				return res.status(404).send({
					message: 'Question difficulty not found!',
				});
			}
			return res.status(200).send(questionDifficulty);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		return QuestionDifficulty
		.create({
			question_difficulty_name: req.body.question_difficulty_name
		})
		.then((questionDifficulty) => res.status(201).send(questionDifficulty))
        .catch((error) => res.status(400).send(error));
        // return res.status(200).json({'msg': req.body.question_difficulty_name});
	},
	
	update(req, res) {
		return QuestionDifficulty
		.findById(req.params.id, {
			// include: [{
			// 	model: Challenge,
			// 	as: 'challenges'
			// }, {
			// 	model: LearningTopic,
			// 	as: 'learningTopics'
			// }],
		})
		.then(questionCategory => {
			if (!questionDifficulty) {
				return res.status(404).send({
					message: 'Question difficulty Not Found!',
				});
			}
			return questionDifficulty
			.update({
                question_difficulty_name: req.body.question_difficulty_name || questionCategory.question_difficulty_name
			})
			.then(() => res.status(200).send(questionDifficulty))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return QuestionDifficulty
		.findById(req.params.id)
		.then(questionDifficulty => {
			if (!questionDifficulty) {
				return res.status(400).send({
					message: 'Question Difficulty Not Found!',
				});
			}
			return questionDifficulty
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};