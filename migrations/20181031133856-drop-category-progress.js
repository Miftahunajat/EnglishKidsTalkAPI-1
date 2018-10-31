'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		Add altering commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.createTable('users', { id: Sequelize.INTEGER });
		*/
		return queryInterface.dropTable('CategoryProgresses');
	},
	
	down: (queryInterface, Sequelize) => {
		/*
		Add reverting commands here.
		Return a promise to correctly handle asynchronicity.
		
		Example:
		return queryInterface.dropTable('users');
		*/
		return queryInterface.createTable('CategoryProgresses', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			question_category_id: {
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	}
};
