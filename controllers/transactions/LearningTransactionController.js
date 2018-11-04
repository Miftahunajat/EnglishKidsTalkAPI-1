const User = require('../models').User;
const Badge = require('../models').Badge;
const LearningItem = require('../models').LearningItem;
const Challenge = require('../models').Challenge;
const QuestionDifficulty = require('../models').QuestionDifficulty;

module.exports = {
	
	addBadge(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: Badge,
				as: 'badges'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			Badge
			.findById(req.body.badge_id)
			.then((badge) => {
				if (!badge) {
					return res.status(404).send({
						message: 'Badge Not Found',
					});
				}
				user.addBadge(badge);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},

	addLearningItem(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: LearningItem,
				as: 'learningItems'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			LearningItem
			.findById(req.body.learning_item_id)
			.then((learningItem) => {
				if (!learningItem) {
					return res.status(404).send({
						message: 'Learning Item Not Found',
					});
				}
				user.addLearningItem(learningItem);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},

	addChallenge(req, res) {
		return User
		.findById(req.body.user_id, {
			include: [{
				model: Challenge,
				as: 'challenges'
			}],
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			Challenge
			.findById(req.body.challenge_id)
			.then((challenge) => {
				if (!challenge) {
					return res.status(404).send({
						message: 'Challenge Not Found',
					});
				}
				user.addChallenge(challenge);
				return res.status(200).send(user);
			})
		})
		.catch((error) => res.status(400).send(error));
	},

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