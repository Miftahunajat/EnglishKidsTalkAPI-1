'use strict';

module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define('Answer', {
		answer_text: DataTypes.STRING,
		is_correct: DataTypes.BOOLEAN
	}, {});
	Answer.associate = function(models) {
		Answer.belongsToMany(models.Challenge, {
			through: 'AnswerOption',
			as: 'challenges',
			foreignKey: 'answer_id'
		});
	};
	return Answer;
};