const Item = require('../../models').Item;
const Inventory = require('../../models').Inventory;

module.exports = {
	addItem(req, res) {
		if (!req.body.item_id) {
			res.status(200).send({
				'msg': 'Field cannot be null!'
			});
		} else {
			return Inventory
				.findById(req.params.inventory_id)
				.then((inventory) => {
					if (!inventory) {
						return res.status(404).send({
							message: 'Inventory Not Found',
						});
					}
					Item
						.findById(req.body.item_id)
						.then((item) => {
							if (!item) {
								return res.status(404).send({
									message: 'Item Not Found',
								});
							}
							inventory.getUser()
								.then((associatedUser) => {
									// Check if user has enough star to buy items
									if (associatedUser.star_gained < item.star)
										return res.status(400).send({
											data: 'Star not enough!'
										});
									// Add item to user's inventory
									inventory.addItem(item, {
											through: {
												is_active: false
											}
										})
										.then(() => {
											// Reduce the user's star
											associatedUser.update({
													star_gained: associatedUser.star_gained - item.star
												})
												.then(() => {
													inventory.getItems({
															where: {
																id: parseInt(req.body.item_id)
															}
														})
														.then((associatedItem) => {
															res.status(200).send(associatedItem);
														})
														.catch((error) => res.status(400).send(error));
												})
												.catch((error) => res.status(400).send(error));
										})
										.catch((error) => res.status(400).send(error));
								})
								.catch((error) => res.status(400).send(error));
						})
						.catch((error) => res.status(400).send(error));
				})
				.catch((error) => res.status(400).send(error));
		}
	},

	activateItem(req, res) {
		return Inventory
			.findById(req.params.inventory_id)
			.then((inventory) => {
				if (!inventory) {
					return res.status(404).send({
						message: 'Inventory Not Found',
					});
				}
				Item
					.findById(req.params.item_id)
					.then((item) => {
						if (!item) {
							return res.status(404).send({
								message: 'Item Not Found',
							});
						}
						inventory.addItem(item, {
								through: {
									is_active: req.query.active
								}
							})
							.then(() => {
								inventory.getItems({
										where: {
											id: parseInt(req.params.item_id)
										}
									})
									.then((associatedItem) => {
										res.status(200).send(associatedItem);
									})
									.catch((error) => res.status(400).send(error));
							})
							.catch((error) => res.status(400).send(error));
					})
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	}
};