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
			queryInterface.addColumn('Users', 'gender', {
				type: Sequelize.STRING
			}),
			queryInterface.addColumn('Users', 'star_gained', {
				type: Sequelize.INTEGER
			}),
			queryInterface.addColumn('Users', 'xp_gained', {
				type: Sequelize.INTEGER
			}),
			queryInterface.dropTable('UserProfiles')
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
			queryInterface.removeColumn('Users', 'gender'),
			queryInterface.removeColumn('Users', 'star_gained'),
			queryInterface.removeColumn('Users', 'xp_gained'),
			queryInterface.createTable('UserProfiles')
		]);
	}
};
