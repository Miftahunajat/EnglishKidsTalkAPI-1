'use strict';
module.exports = (sequelize, DataTypes) => {
	const QuestionCategory = sequelize.define('QuestionCategory', {
		question_category_name: DataTypes.STRING
	}, {});
	QuestionCategory.associate = function(models) {
		QuestionCategory.hasMany(models.LearningTopic, {
			foreignKey: 'question_category_id',
			as: 'learningTopics'
		});
		QuestionCategory.hasMany(models.Challenge, {
			foreignKey: 'question_category_id',
			as: 'challenges'
		});
	};
	return QuestionCategory;
};