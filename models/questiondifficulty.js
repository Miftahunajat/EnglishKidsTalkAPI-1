'use strict';
module.exports = (sequelize, DataTypes) => {
	const QuestionDifficulty = sequelize.define('QuestionDifficulty', {
		question_difficulty_name: DataTypes.INTEGER
	}, {});
	QuestionDifficulty.associate = function(models) {
		QuestionDifficulty.hasMany(models.LearningTopic, {
			foreignKey: 'question_difficulty_id',
			as: 'learningTopics'
		});
		QuestionDifficulty.hasMany(models.Challenge, {
			foreignKey: 'question_difficulty_id',
			as: 'challenges'
		});
	};
	return QuestionDifficulty;
};