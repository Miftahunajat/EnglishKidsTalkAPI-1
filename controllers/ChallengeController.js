const Challenge = require('../models').Challenge;
const QuestionCategory = require('../models').QuestionCategory;
const User = require('../models').User;
const Answer = require('../models').Answer;

module.exports = {
	list(req, res) {
		return Challenge
			.findAll({
				include: [{
					model: QuestionCategory,
					as: 'questionCategory'
				}, {
					model: User,
					as: 'users'
				}, {
					model: Answer,
					as: 'answers'
				}],
				order: [
					['createdAt', 'DESC'],
					[{
						model: User,
						as: 'users'
					}, 'createdAt', 'DESC'],
				],
			})
			.then((challenges) => {
				res.status(200).send(challenges)
			})
			.catch((error) => {
				res.status(400).send(error);
			});
	},

	getById(req, res) {
		return Challenge
			.findById(req.params.id, {
				include: [{
					model: QuestionCategory,
					as: 'questionCategory'
				}, {
					model: User,
					as: 'users'
				}, {
					model: Answer,
					as: 'answers'
				}],
			})
			.then((challenge) => {
				if (!challenge) {
					return res.status(404).send({
						message: 'Challenge not found!',
					});
				}
				return res.status(200).send(challenge);
			})
			.catch((error) => res.status(400).send(error));
	},

	add(req, res) {
		let question_category_id = req.body.question_category_id;
		let challenge_xp = req.body.challenge_xp;
		let challenge_star = req.body.challenge_star;
		let challenge_image = req.file.url;
		let challenge_question = req.body.challenge_question;
		let challenge_type = req.body.challenge_type;
		if (!question_category_id || !question_difficulty_id || !challenge_xp || !challenge_star || !challenge_image || !challenge_question || !challenge_type) {
			res.status(404).send({
				'msg': 'Field cannot be null!'
			});
		} else {
			return Challenge
				.create({
					question_category_id: question_category_id,
					question_difficulty_id: question_difficulty_id,
					challenge_xp: parseInt(challenge_xp),
					challenge_star: parseInt(challenge_star),
					challenge_image: challenge_image,
					challenge_question: challenge_question,
					challenge_type: challenge_type
				})
				.then((challenge) => res.status(201).send(challenge))
				.catch((error) => res.status(400).send(error));
		}
	},

	update(req, res) {
		let question_category_id = req.body.question_category_id;
		let question_difficulty_id = req.body.question_difficulty_id;
		let challenge_xp = req.body.challenge_xp;
		let challenge_star = req.body.challenge_star;
		let challenge_image = null;
		let challenge_question = req.body.challenge_question;
		let challenge_type = req.body.challenge_type;
		if (req.file) {
			challenge_image = req.file.url;
		}
		return Challenge
			.findById(req.params.id, {
				include: [{
					model: QuestionCategory,
					as: 'questionCategory'
				}],
			})
			.then(challenge => {
				if (!challenge) {
					return res.status(404).send({
						message: 'Challenge Not Found!',
					});
				}
				return challenge
					.update({
						question_category_id: question_category_id || challenge.question_category_id,
						question_difficulty_id: question_difficulty_id || challenge.question_difficulty_id,
						challenge_xp: challenge_xp || challenge.challenge_xp,
						challenge_star: challenge_star || challenge.challenge_star,
						challenge_image: challenge_image || challenge.challenge_image,
						challenge_question: challenge_question || challenge.challenge_question,
						challenge_type: challenge_type || challenge.challenge_type
					})
					.then(() => res.status(200).send(challenge))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},

	delete(req, res) {
		return Challenge
			.findById(req.params.id)
			.then(challenge => {
				if (!challenge) {
					return res.status(400).send({
						message: 'Challenge Not Found!',
					});
				}
				return challenge
					.destroy()
					.then(() => res.status(204).send({
						message: 'Data deleted!'
					}))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
};