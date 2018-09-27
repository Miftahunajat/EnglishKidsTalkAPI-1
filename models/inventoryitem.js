'use strict';
module.exports = (sequelize, DataTypes) => {
	const InventoryItem = sequelize.define('InventoryItem', {
		item_id: DataTypes.INTEGER,
		inventory_id: DataTypes.INTEGER,
		is_active: DataTypes.BOOLEAN
	}, {});
	InventoryItem.associate = function(models) {
		
	};
	return InventoryItem;
};