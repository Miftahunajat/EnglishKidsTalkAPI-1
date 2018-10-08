const Challenge = require('../models').Challenge;
const QuestionDifficulty = require('../models').QuestionDifficulty;
const User = require('../models').User;

module.exports = {
	list(req, res) {
		return Challenge
		.findAll({
			include: [{
				model: QuestionDifficulty,
				as: 'questionDifficulty'
			}, {
                model: User,
                as: 'users'
            }],
			order: [
				['createdAt', 'DESC'],
				[{ model: User, as: 'users' }, 'createdAt', 'DESC'],
			],
		})
		.then((challenges) => res.status(200).send(challenges))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return Challenge
		.findById(req.params.id, {
			include: [{
				model: QuestionDifficulty,
				as: 'questionDifficulty'
			}, {
                model: User,
                as: 'users'
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
		return Challenge
		.create({
            question_category_id: req.body.question_category_id,
            question_difficulty_id: req.body.question_difficulty_id,
            challenge_xp: req.body.challenge_xp,
            challenge_star: req.body.challenge_star,
            challenge_image: req.file.url,
            challenge_question: req.body.challenge_question,
		})
		.then((challenge) => res.status(201).send(challenge))
		.catch((error) => res.status(400).send(error));
	},

	addAnswerOption(req, res) {
		return Challenge
		.findById(req.body.challenge_id, {
			include: [{
				model: Answer,
				as: 'answerOptions'
			}],
		})
		.then((challenge) => {
			if (!challenge) {
				return res.status(404).send({
					message: 'Challenge Not Found',
				});
			}
			Answer
			.findById(req.body.answer_id)
			.then((answer) => {
				if (!answer) {
					return res.status(404).send({
						message: 'Answer Not Found',
					});
				}
				challenge.addAnswer(answer);
				return res.status(200).send(challenge);
			})
		})
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return Challenge
		.findById(req.params.id, {
			include: [{
				model: QuestionDifficulty,
				as: 'questionDifficulty'
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
                question_category_id: req.body.question_category_id || challenge.question_category_id,
                question_difficulty_id: req.body.question_difficulty_id || challenge.question_difficulty_id,
                challenge_xp: req.body.challenge_xp || challenge.challenge_xp,
                challenge_star: req.body.challenge_star || challenge.challenge_star,
                challenge_image: req.file.url || challenge.challenge_image,
                challenge_question: req.body.challenge_question || challenge.challenge_question
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