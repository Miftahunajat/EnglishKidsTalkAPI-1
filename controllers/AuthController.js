const User = require('../models').User;
const Inventory = require('../models').Inventory;
const Item = require('../models').Item;
const QuestionDifficulty = require('../models').QuestionDifficulty;

const jwt = require('jsonwebtoken');
const passport = require('passport');

const DEFAULT_GIRL_ITEM_IDS = [4,5,6];
const DEFAULT_BOY_ITEM_IDS = [1,2,3];
let itemsIDs = [];

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
			if (gender === 0)
				itemsIDs = DEFAULT_BOY_ITEM_IDS;
			else if (gender === 1)
				itemsIDs = DEFAULT_GIRL_ITEM_IDS;
			const createUserPromise = User.create({
				name: name,
				username: username,
				password: password,
				gender: gender,
				star_gained: 0,
				xp_gained: 0
			});
			const createInventoryPromise = createUserPromise.then(user => {
				return Inventory.create({user_id: user.id});
			});
			const findDifficultyPromise = QuestionDifficulty.find({
				where: {
					question_difficulty_name: 'easy'
				}
			});

			Promise.all([
				createUserPromise,
				createInventoryPromise,
				findDifficultyPromise
			])
			.then(([user, inventory, questionDifficulty]) => {
				user.update({inventory_id: inventory.id});
				Promise.all([
					Item.findById(itemsIDs[0]),
					Item.findById(itemsIDs[1]),
					Item.findById(itemsIDs[2])
				])
				.then((items) => {
					user.addQuestionDifficulty(questionDifficulty);
					inventory.setItems(items, {through: {is_active: true}});
					res.status(201).send(user);
				})
				.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
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
				if (!user){
					return res.status(404).json({msg: 'Login failed!'});
				}
				const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
				return res.json({msg: 'Login successfully!', token});
			});
		})(req, res);
	}
}