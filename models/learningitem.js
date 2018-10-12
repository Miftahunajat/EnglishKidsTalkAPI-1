'use strict';
module.exports = (sequelize, DataTypes) => {
	const LearningItem = sequelize.define('LearningItem', {
		learning_topic_id: DataTypes.INTEGER,
		learning_item_xp: DataTypes.INTEGER,
		learning_item_title: DataTypes.STRING,
		learning_item_image: DataTypes.TEXT
	}, {});
	LearningItem.associate = function(models) {
		LearningItem.belongsToMany(models.User, {
			through: 'LearningProgress',
			as: 'users',
			foreignKey: 'learning_item_id'
		});
		LearningItem.belongsTo(models.LearningTopic, {
			foreignKey: 'learning_topic_id',
			as: 'learningTopic'
		});
	};
	return LearningItem;
};