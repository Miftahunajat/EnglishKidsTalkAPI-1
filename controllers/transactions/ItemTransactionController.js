const Item = require('../../models').Item;
const Inventory = require('../../models').Inventory;

module.exports = {

	addItem(req, res) {

		const findInventoryPromise = Inventory.findById(req.params.id);
		const findItemPromise = Item.findById(req.body.item_id);
		const findUserPromise = findInventoryPromise.then(inventory => {
									return inventory.getUser()
								});

		Promise.all([
			findInventoryPromise,
			findItemPromise,
			findUserPromise
		])
		.then(([inventory, item, user]) => {
			if (inventory && item) {
				if (user.star_gained < item.star)
					return res.status(400).send({data: 'Star not enough!'});
				inventory.addItem(item, {through: {is_active: false}});
				user.update({star_gained: user.star_gained - item.star});
				return res.status(200).send({msg: 'Success!'});
			} else {
				let message = '';
				if (!inventory)
					message = 'Inventory not found !';
				else if (!item) 
					message = 'Item not found !';
				return res.status(404).send({msg: message});
			}
		})
		.catch((error) => res.status(400).send(error));

	},

	activateItem(req, res) {

		const findInventoryPromise = Inventory.findById(req.params.id);
		const findItemPromise = Item.findById(req.params.item_id);

		Promise.all([
			findInventoryPromise,
			findItemPromise
		])
		.then(([inventory, item]) => {
			if (inventory && item) {
				inventory.addItem(item, {through: {is_active: req.query.active}})
				let activationMsg = '';
				if (req.query.active == 'false') 
					activationMsg = 'deactivated';
				else 
					activationMsg = 'activated';
				return res.status(200).send({msg: 'Item has ' + activationMsg + ' !'});
			} else {
				let message = '';
				if (!inventory)
					message = 'Inventory not found !';
				else if (!item) 
					message = 'Item not found !';
				return res.status(404).send({msg: message});
			}
		})
		.catch((error) => res.status(400).send(error));
	}

}; 