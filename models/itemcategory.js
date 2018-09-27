'use strict';
module.exports = (sequelize, DataTypes) => {
	const ItemCategory = sequelize.define('ItemCategory', {
		item_category_image: DataTypes.TEXT,
		item_category_name: DataTypes.STRING,
		item_category_color: DataTypes.STRING
	}, {});
	ItemCategory.associate = function(models) {
		ItemCategory.hasMany(models.Item, {
			foreignKey: 'item_category_id',
			as: 'items'
		});
	};
	return ItemCategory;
};