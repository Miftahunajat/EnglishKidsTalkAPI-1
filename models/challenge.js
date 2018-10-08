'use strict';
module.exports = (sequelize, DataTypes) => {
	const Challenge = sequelize.define('Challenge', {
		question_category_id: DataTypes.INTEGER,
		question_difficulty_id: DataTypes.INTEGER,
		challenge_xp: DataTypes.INTEGER,
		challenge_star: DataTypes.INTEGER,
		challenge_image: DataTypes.TEXT,
		challenge_question: DataTypes.STRING
	}, {});
	Challenge.associate = function(models) {
		Challenge.belongsToMany(models.User, {
			through: 'ChallengeProgress',
			as: 'users',
			foreignKey: 'challenge_id'
		});
		Challenge.hasMany(models.Answer, {
			foreignKey: 'challenge_id',
			as: 'answers'
		});
		Challenge.belongsTo(models.QuestionDifficulty, {
			foreignKey: 'question_difficulty_id',
			as: 'questionDifficulty'
		});
		Challenge.belongsTo(models.QuestionCategory, {
			foreignKey: 'question_category_id',
			as: 'questionCategory'
		});
	};
	return Challenge;
};