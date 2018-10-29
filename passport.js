const passport 		= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT 	= require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT 	= passportJWT.ExtractJwt;
const UserModel		= require('./models').User;

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, 
function (username, password, cb) {
	let whereUser = {
		username: username,
		password: password
	}
	return UserModel.findOne({where: whereUser})
	.then(user => {
		if (!user) {
			return cb(null, false, {message: 'Incorrect username or password!'});
		}
		return cb(null, user, {message: 'Logged in successfully!'});
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