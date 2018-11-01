'use strict';
module.exports = (sequelize, DataTypes) => {
  const DifficultyProgress = sequelize.define('DifficultyProgress', {
    question_difficulty_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  DifficultyProgress.associate = function(models) {
    // associations can be defined here
  };
  return DifficultyProgress;
};