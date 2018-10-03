const Challenge = require('../models').Challenge;
const LearningTopic = require('../models').LearningTopic;
const QuestionCategory = require('../models').QuestionCategory;

module.exports = {
	list(req, res) {
		return QuestionCategory
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
		.then((questionCategories) => res.status(200).send(questionCategories))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return QuestionCategory
		.findById(req.params.id, {
			// include: [{
			// 	model: Challenge,
			// 	as: 'challenges'
			// }, {
			// 	model: LearningTopic,
			// 	as: 'learningTopics'
			// }],
		})
		.then((questionCategory) => {
			if (!questionCategory) {
				return res.status(404).send({
					message: 'Question category not found!',
				});
			}
			return res.status(200).send(questionCategory);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		return QuestionCategory
		.create({
			question_category_name: req.body.question_category_name
		})
		.then((questionCategory) => res.status(201).send(questionCategory))
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return QuestionCategory
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
			if (!questionCategory) {
				return res.status(404).send({
					message: 'Question category Not Found!',
				});
			}
			return questionCategory
			.update({
                question_category_name: req.body.question_category_name || questionCategory.question_category_name
			})
			.then(() => res.status(200).send(questionCategory))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return QuestionCategory
		.findById(req.params.id)
		.then(questionCategory => {
			if (!questionCategory) {
				return res.status(400).send({
					message: 'Question Category Not Found!',
				});
			}
			return questionCategory
			.destroy()
			.then(() => res.status(204).send({
				message: 'Data deleted!'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};