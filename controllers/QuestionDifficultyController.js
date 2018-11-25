const QuestionDifficulty = require('../models').QuestionDifficulty;
const QuestionCategory = require('../models').QuestionCategory;

module.exports = {
	list(req, res) {
		return QuestionDifficulty
		.findAll({
			include: [{
				model: QuestionCategory,
				as: 'questionCategories'
			}],
			order: [
				['createdAt', 'DESC'],
				[{ model: QuestionCategory, as: 'questionCategories' }, 'createdAt', 'DESC'],
			],
		})
		.then((questionDifficulties) => res.status(200).send(questionDifficulties))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return QuestionDifficulty
		.findById(req.params.id, {
			include: [{
				model: QuestionCategory,
				as: 'questionCategories'
			}],
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
		let question_difficulty_name = req.body.question_difficulty_name;
		let star_needed = req.body.star_needed;
		if (!question_difficulty_name || !star_needed){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
			return QuestionDifficulty
			.create({
				question_difficulty_name: question_difficulty_name,
				star_needed: parseInt(star_needed)
			})
			.then((questionDifficulty) => res.status(201).send(questionDifficulty))
			.catch((error) => res.status(400).send(error));
		}
	},
	
	update(req, res) {
		let question_difficulty_name = req.body.question_difficulty_name;
		let star_needed = req.body.star_needed;
		return QuestionDifficulty
		.findById(req.params.id)
		.then(questionDifficulty => {
			if (!questionDifficulty) {
				return res.status(404).send({
					message: 'Question difficulty Not Found!',
				});
			}
			return questionDifficulty
			.update({
				question_difficulty_name: question_difficulty_name || questionDifficulty.question_difficulty_name,
				star_needed: star_needed || questionDifficulty.star_needed,
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