const Answer = require('../models').Answer;
const Challenge = require('../models').Challenge;

module.exports = {
	list(req, res) {
		return Answer
		.findAll({
			include: [{
				model: Challenge,
				as: 'challenge'
			}],
			order: [
				['createdAt', 'DESC'],
				[{ model: Challenge, as: 'challenge' }, 'createdAt', 'DESC'],
			],
		})
		.then((answers) => res.status(200).send(answers))
		.catch((error) => { res.status(400).send(error); });
	},
	
	getById(req, res) {
		return Answer
		.findById(req.params.id, {
			include: [{
				model: Challenge,
				as: 'challenges'
			}],
		})
		.then((answer) => {
			if (!answer) {
				return res.status(404).send({
					message: 'Answer not found!',
				});
			}
			return res.status(200).send(answer);
		})
		.catch((error) => res.status(400).send(error));
	},
	
	add(req, res) {
		return Answer
		.create({
			challenge_id: req.body.challenge_id,
			answer_text: req.body.answer_text,
			is_correct: req.body.is_correct
		})
		.then((answer) => res.status(201).send(answer))
		.catch((error) => res.status(400).send(error));
	},
	
	update(req, res) {
		return Answer
		.findById(req.params.id, {
			include: [{
				model: Challenge,
				as: 'challenges'
			}],
		})
		.then(answer => {
			if (!answer) {
				return res.status(404).send({
					message: 'Answer Not Found!',
				});
			}
			return answer
			.update({
				challenge_id: req.body.challenge_id || answer.challenge_id,
				answer_text: req.body.answer_text || answer.answer_text,
				is_correct: req.body.is_correct || answer.is_correct
			})
			.then(() => res.status(200).send(answer))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
	
	delete(req, res) {
		return Answer
		.findById(req.params.id)
		.then(answer => {
			if (!answer) {
				return res.status(400).send({
					message: 'Answer Not Found!',
				});
			}
			return answer
			.destroy()
			.then(() => res.status(204).send())
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},
};