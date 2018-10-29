const User = require('../models').User;
const Inventory = require('../models').Inventory;
const Item = require('../models').Item;

const jwt = require('jsonwebtoken');
const passport = require('passport');

const bcrypt = require('bcrypt');

// const DEFAULT_GIRL_ITEM_IDS = [1,2];
// const DEFAULT_BOY_ITEM_IDS = [1,2];
const DEFAULT_GIRL_ITEM_IDS = [37,38,39];
const DEFAULT_BOY_ITEM_IDS = [41,42,43];

module.exports = {

    register(req, res) {
		let name = req.body.name;
		let username = req.body.username;
		let password = req.body.password;
		let gender = req.body.gender;
		if (!name || !username || !password || !gender){
			res.status(404).send({'msg': 'Field cannot be null!'});
		} 
		else {
			gender = parseInt(gender);
			return User
			.create({
				name: name,
				username: username,
				password: bcrypt.hashSync(password, 10),
				gender: gender,
				star_gained: 0,
				xp_gained: 0
			})
			.then((user) => {
				Inventory
				.create({
					user_id: user.id
				})
				.then((inventory) => {
					user
					.update({
						inventory_id: inventory.id
					})
					.then((user) => {
						let itemTemp = [];
						if (user.gender == 0) itemTemp = DEFAULT_BOY_ITEM_IDS;
						else itemTemp = DEFAULT_GIRL_ITEM_IDS;
						Item
						.findById(itemTemp[0])
						.then((item1) => {
							Item
							.findById(itemTemp[1])
							.then((item2) => {
								inventory.setItems([item1, item2], {through: {is_active: true}});
								res.status(201).send({'msg' : 'Successfully registered !'});
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

    login(req, res, next) {
		passport.authenticate('local', {session: false, failureFlash: true}, (err, user, info) => {
			if (err || !user) {
				return next(err);
			}
		   	req.login(user, {session: false}, (err) => {
			   if (err) {
				   res.send(err);
			   }
			   const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
			   return res.json({user, token});
			});
		})(req, res);
    }
    
}