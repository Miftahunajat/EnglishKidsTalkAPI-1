'use strict';
module.exports = (sequelize, DataTypes) => {
	const LearningTopic = sequelize.define('LearningTopic', {
		question_difficulty_id: DataTypes.INTEGER,
		question_category_id: DataTypes.INTEGER,
		learning_topic_name: DataTypes.STRING,
		learning_topic_image: DataTypes.TEXT
	}, {});
	LearningTopic.associate = function(models) {
		LearningTopic.hasMany(models.LearningItem, {
			foreignKey: 'learning_topic_id',
			as: 'learningItems'
		});
		LearningTopic.belongsTo(models.QuestionDifficulty);
		LearningTopic.belongsTo(models.QuestionCategory);
	};
	return LearningTopic;
};