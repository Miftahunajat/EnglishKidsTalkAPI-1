'use strict';

module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define('Answer', {
		challenge_id: DataTypes.INTEGER,
		answer_text: DataTypes.STRING,
		is_correct: DataTypes.BOOLEAN
	}, {});
	Answer.associate = function(models) {
		Answer.belongsTo(models.Challenge, {
			foreignKey: 'challenge_id',
			as: 'challenge'
		});
	};
	return Answer;
};