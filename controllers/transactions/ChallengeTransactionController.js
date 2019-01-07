const User = require('../../models').User;
const Challenge = require('../../models').Challenge;

module.exports = {

	addChallenge(req, res) {
		const getUserPromise = User.findById(req.params.id);
		const getChallengePromise = Challenge.findById(req.body.challenge_id);

		Promise.all([
				getUserPromise,
				getChallengePromise
			])
			.then(([user, challenge]) => {
				if (user && challenge) {
					user.addChallenge(challenge);
					return res.status(200).send(user);
				} else {
					let message = '';
					if (!user)
						message = 'User not found !';
					else if (!challenge)
						message = 'Challenge not found !';
					res.status(404).send({
						msg: message
					});
				}
			})
			.catch((error) => res.status.send(error));
	}

};