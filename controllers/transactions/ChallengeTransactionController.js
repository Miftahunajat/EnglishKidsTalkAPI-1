const User = require('../models').User;
const Challenge = require('../models').Challenge;

module.exports = {
	
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
	}

};