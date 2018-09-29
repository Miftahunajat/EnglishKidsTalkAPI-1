'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		profile_id: DataTypes.INTEGER,
		inventory_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING
	}, {});
	User.associate = function(models) {
		// User.hasOne(models.UserProfile, {
		// 	foreignKey: 'user_id',
		// 	as: 'userProfile'
		// });
		User.hasOne(models.Inventory, {
			foreignKey: 'user_id',
			as: 'inventory'
		});
		User.belongsToMany(models.Badge, {
			through: 'BadgeEarning',
			as: 'badges',
			foreignKey: 'user_id'
		});
		User.belongsToMany(models.LearningItem, {
			through: 'LearningProgress',
			as: 'learningItems',
			foreignKey: 'user_id'
		});
	};
	return User;
};