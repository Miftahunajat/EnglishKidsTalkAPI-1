'use strict';
module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define('Item', {
		item_category_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		item_desc: DataTypes.TEXT,
		star: DataTypes.INTEGER,
		image: DataTypes.TEXT,
		x_coordinate: DataTypes.FLOAT,
		y_coordinate: DataTypes.FLOAT
	}, {});
	Item.associate = function(models) {
		Item.belongsTo(models.ItemCategory);
		Item.belongsToMany(models.Inventory, {
			through: 'InventoryItem',
			as: 'inventories',
			foreignKey: 'item_id'
		});
	};
	return Item;
};