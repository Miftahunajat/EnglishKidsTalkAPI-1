'use strict';
module.exports = (sequelize, DataTypes) => {
	const UserProfile = sequelize.define('UserProfile', {
		user_id: DataTypes.INTEGER,
		gender: DataTypes.STRING,
		star_gained: DataTypes.INTEGER,
		xp_gained: DataTypes.INTEGER
	}, {});
	UserProfile.associate = function(models) {
		UserProfile.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user'
		});
	};
	return UserProfile;
};