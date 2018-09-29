'use strict';
module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define('Inventory', {
		user_id: DataTypes.INTEGER
	}, {});
	Inventory.associate = function(models) {
		Inventory.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user'
		});
	};
	return Inventory;
};