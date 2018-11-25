const User = require('../../models').User;
const Badge = require('../../models').Badge;

module.exports = {

	addBadge(req, res) {
		const getUserPromise = User.findById(req.params.id);
		const getBadgePromise = Badge.findById(req.body.badge_id);

		Promise.all([
			getUserPromise,
			getBadgePromise
		]).then(([user, badge]) => {
			if (user && badge) {
				// if (user.hasBadge(badge))
				// 	return res.status(400).send({msg: 'This user is already earned this badge!'});
				// else
				// 	user.addBadge(badge);
				user.addBadge(badge);
				return res.status(200).send({
					'msg': 'Badge earned successfully!'
				});
			} else {
				let message = '';
				if (!user) {
					message = 'User not found!';
				} else if (!badge) {
					message = 'Badge not found!';
				}
				return res.status(404).send({
					message: message,
				});
			}
		})
		.catch((error) => res.status(400).send(error));
	}
	
};