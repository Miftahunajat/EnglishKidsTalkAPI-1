'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerOption = sequelize.define('AnswerOption', {
    answer_id: DataTypes.INTEGER,
    challenge_id: DataTypes.INTEGER
  }, {});
  AnswerOption.associate = function(models) {
    // associations can be defined here
  };
  return AnswerOption;
};