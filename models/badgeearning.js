'use strict';
module.exports = (sequelize, DataTypes) => {
	const BadgeEarning = sequelize.define('BadgeEarning', {
		badge_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER
	}, {});
	BadgeEarning.associate = function(models) {
		// associations can be defined here
	};
	return BadgeEarning;
};