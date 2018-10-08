'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		Add altering commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.createTable('users', { id: Sequelize.INTEGER });
		*/
		return queryInterface.changeColumn('Users', 'gender', {
			type: 'INTEGER USING CAST("gender" as INTEGER)'
		});
	},
	
	down: (queryInterface, Sequelize) => {
		/*
		Add reverting commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.dropTable('users');
		*/
		return queryInterface.changeColumn('Users', 'gender', {
			type: Sequelize.STRING
		});
	}
};
