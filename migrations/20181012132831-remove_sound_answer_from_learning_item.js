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
			queryInterface.removeColumn('LearningItems', 'learning_item_sound'),
			queryInterface.removeColumn('LearningItems', 'learning_item_answer')
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
			queryInterface.addColumn('LearningItems', 'learning_item_sound', {
				type: Sequelize.TEXT
			}),
			queryInterface.addColumn('LearningItems', 'learning_item_answer', {
				type: Sequelize.STRING
			})
		]);
	}
};
