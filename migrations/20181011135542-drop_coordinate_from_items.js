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
			queryInterface.removeColumn('Items', 'x_coordinate'),
			queryInterface.removeColumn('Items', 'y_coordinate')
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
			queryInterface.addColumn('Items', 'x_coordinate', {
				type: Sequelize.FLOAT
			}),
			queryInterface.addColumn('Users', 'y_coordinate', {
				type: Sequelize.FLOAT
			})
		]);
	}
};
