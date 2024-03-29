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
			queryInterface.removeColumn('Users', 'avatar'),
			queryInterface.removeColumn('Users', 'rank')
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
			queryInterface.addColumn('Users', 'avatar', {
				type: Sequelize.INTEGER
			}),
			queryInterface.addColumn('Users', 'rank', {
				type: Sequelize.INTEGER
			})
		]);
	}
};
