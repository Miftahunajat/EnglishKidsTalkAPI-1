'use strict';
module.exports = (sequelize, DataTypes) => {
	const CategoryProgress = sequelize.define('CategoryProgress', {
		question_category_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER
	}, {});
	CategoryProgress.associate = function(models) {
		// associations can be defined here
	};
	return CategoryProgress;
};