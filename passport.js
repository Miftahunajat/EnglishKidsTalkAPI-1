const passport 		= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT 	= require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT 	= passportJWT.ExtractJwt;
const UserModel		= require('./models').User;
const bcrypt		= require('bcrypt');

passport.use(new LocalStrategy({
	emailField: 'username',
	passwordField: 'password'
}, 
function (username, password, cb) {
	return UserModel.findOne({where: {username: username, password: password}})
	.then(user => {
		if (bcrypt.compare(password, this.password)) {
			return cb(null, user, {message: 'Logged in successfully!'});
		}
		return cb(null, false, {message: 'Failed to login!'});
	})
	.catch(err => cb(err));
}
));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {
	return UserModel.findById(jwtPayload.id)
		.then(user => {
			return cb(null, user);
		})
		.catch(err => {
			return cb(err);
		});
}
));

module.exports = passport;