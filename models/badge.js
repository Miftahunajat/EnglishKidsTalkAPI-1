'use strict';
module.exports = (sequelize, DataTypes) => {
	const Badge = sequelize.define('Badge', {
		badge_name: DataTypes.STRING,
		badge_image: DataTypes.TEXT
	}, {});
	Badge.associate = function(models) {
		Badge.belongsToMany(models.User, {
			through: 'BadgeEarning',
			as: 'users',
			foreignKey: 'badge_id'
		});
	};
	return Badge;
};