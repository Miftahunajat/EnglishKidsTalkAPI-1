'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		Add altering commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.createTable('users', { id: Sequelize.INTEGER });
		*/
		return Promise.all([
			queryInterface.addColumn('QuestionCategories', 'question_difficulty_id', {
				type: Sequelize.INTEGER
			}),
			queryInterface.removeColumn('LearningTopics', 'question_difficulty_id')
		]);
	},
	
	down: (queryInterface, Sequelize) => {
		/*
		Add reverting commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.dropTable('users');
		*/
		return Promise.all([
			queryInterface.removeColumn('QuestionCategories', 'question_difficulty_id'),
			queryInterface.addColumn('LearningTopics', 'question_difficulty_id', {
				type: Sequelize.INTEGER
			})
		]);
	}
};
