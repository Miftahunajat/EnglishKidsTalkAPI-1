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
				as: 'challenge'
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
		let challenge_id = req.body.challenge_id;
		let answer_text = req.body.answer_text;
		let is_correct = req.body.is_correct;
		if (!challenge_id || !answer_text || !is_correct){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} else {
			return Answer
			.create({
				challenge_id: challenge_id,
				answer_text: answer_text,
				is_correct: is_correct
			})
			.then((answer) => res.status(201).send(answer))
			.catch((error) => res.status(400).send(error));
		}
	},
	
	update(req, res) {
		let challenge_id = req.body.challenge_id;
		let answer_text = req.body.answer_text;
		let is_correct = req.body.is_correct;
		return Answer
		.findById(req.params.id, {
			include: [{
				model: Challenge,
				as: 'challenge'
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
				challenge_id: challenge_id || answer.challenge_id,
				answer_text: answer_text || answer.answer_text,
				is_correct: is_correct || answer.is_correct
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