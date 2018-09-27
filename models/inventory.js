'use strict';
module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define('Inventory', {
		user_id: DataTypes.INTEGER
	}, {});
	Inventory.associate = function(models) {
		// associations can be defined here
	};
	return Inventory;
};