'use strict';
module.exports = (sequelize, DataTypes) => {
	const QuestionDifficulty = sequelize.define('QuestionDifficulty', {
		question_difficulty_name: {type: DataTypes.INTEGER, allowNull: false}
	}, {});
	QuestionDifficulty.associate = function(models) {
		QuestionDifficulty.hasMany(models.QuestionCategory, {
			foreignKey: 'question_difficulty_id',
			as: 'questionCategories'
		});
		QuestionDifficulty.hasMany(models.Challenge, {
			foreignKey: 'question_difficulty_id',
			as: 'challenges'
		});
	};
	return QuestionDifficulty;
};