'use strict';
module.exports = (sequelize, DataTypes) => {
	const ChallengeProgress = sequelize.define('ChallengeProgress', {
		challenge_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
		is_success: DataTypes.BOOLEAN,
		time_passed: DataTypes.INTEGER
	}, {});
	ChallengeProgress.associate = function(models) {
		
	};
	return ChallengeProgress;
};