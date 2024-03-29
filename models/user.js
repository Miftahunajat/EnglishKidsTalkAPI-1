'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		inventory_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		username: {
			type: DataTypes.STRING,
			unique: true
		},
		password: DataTypes.STRING,
		gender: DataTypes.INTEGER,
		star_gained: DataTypes.INTEGER,
		xp_gained: DataTypes.INTEGER
	}, {});
	User.associate = function(models) {
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
		User.belongsToMany(models.Challenge, {
			through: 'ChallengeProgress',
			as: 'challenges',
			foreignKey: 'user_id'
		});
		User.belongsToMany(models.QuestionDifficulty, {
			through: 'DifficultyProgress',
			as: 'questionDifficulties',
			foreignKey: 'user_id'
		});
	};
	return User;
};