'use strict';
module.exports = (sequelize, DataTypes) => {
	const QuestionCategory = sequelize.define('QuestionCategory', {
		question_difficulty_id: DataTypes.INTEGER,
		question_category_name: DataTypes.STRING,
		star_needed: DataTypes.INTEGER
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
		QuestionCategory.belongsTo(models.QuestionDifficulty, {
			foreignKey: 'question_difficulty_id',
			as: 'questionDifficulty'
		});
		QuestionCategory.belongsToMany(models.User, {
			through: 'CategoryProgress',
			as: 'users',
			foreignKey: 'question_category_id'
		});
	};
	return QuestionCategory;
};