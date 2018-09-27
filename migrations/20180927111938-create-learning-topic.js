'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LearningTopics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_difficulty_id: {
        type: Sequelize.INTEGER
      },
      question_category_id: {
        type: Sequelize.INTEGER
      },
      learning_topic_name: {
        type: Sequelize.STRING
      },
      learning_topic_image: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('LearningTopics');
  }
};