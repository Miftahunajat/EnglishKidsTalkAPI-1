'use strict';
module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define('Item', {
		item_category_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		item_desc: DataTypes.TEXT,
		star: DataTypes.INTEGER,
		gender: DataTypes.INTEGER,
		image: DataTypes.TEXT,
		snippet: DataTypes.TEXT
	}, {});
	Item.associate = function(models) {
		Item.belongsTo(models.ItemCategory, {
			foreignKey: 'item_category_id',
			as: 'itemCategory'
		});
		Item.belongsToMany(models.Inventory, {
			through: 'InventoryItem',
			as: 'inventories',
			foreignKey: 'item_id'
		});
	};
	return Item;
};