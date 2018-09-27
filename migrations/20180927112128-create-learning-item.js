'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LearningItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      learning_topic_id: {
        type: Sequelize.INTEGER
      },
      learning_item_xp: {
        type: Sequelize.INTEGER
      },
      learning_item_title: {
        type: Sequelize.STRING
      },
      learning_item_image: {
        type: Sequelize.TEXT
      },
      learning_item_sound: {
        type: Sequelize.TEXT
      },
      learning_item_answer: {
        type: Sequelize.STRING
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LearningItems');
  }
};