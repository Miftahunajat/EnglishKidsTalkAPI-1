'use strict';
module.exports = (sequelize, DataTypes) => {
	const LearningProgress = sequelize.define('LearningProgress', {
		learning_item_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER
	}, {});
	LearningProgress.associate = function(models) {
		// associations can be defined here
	};
	return LearningProgress;
};