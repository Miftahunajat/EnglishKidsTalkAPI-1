'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_category_id: {
        type: Sequelize.INTEGER
      },
      question_difficulty_id: {
        type: Sequelize.INTEGER
      },
      challenge_xp: {
        type: Sequelize.INTEGER
      },
      challenge_star: {
        type: Sequelize.INTEGER
      },
      challenge_image: {
        type: Sequelize.TEXT
      },
      challenge_question: {
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
    return queryInterface.dropTable('Challenges');
  }
};