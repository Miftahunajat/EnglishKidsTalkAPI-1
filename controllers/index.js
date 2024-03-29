const BadgeController = require('./BadgeController');
const AnswerController = require('./AnswerController');
const ItemCategoryController = require('./ItemCategoryController');
const QuestionCategoryController = require('./QuestionCategoryController');
const QuestionDifficultyController = require('./QuestionDifficultyController');
const InventoryController = require('./InventoryController');
const UserController = require('./UserController');
const LearningTopicController = require('./LearningTopicController');
const ItemController = require('./ItemController');
const LearningItemController = require('./LearningItemController');
const ChallengeController = require('./ChallengeController');
const AuthController = require('./AuthController');
const BadgeTransactionController = require('./transactions/BadgeTransactionController');
const ChallengeTransactionController = require('./transactions/ChallengeTransactionController');
const DifficultyTransactionController = require('./transactions/DifficultyTransactionController');
const LearningTransactionController = require('./transactions/LearningTransactionController');
const ItemTransactionController = require('./transactions/ItemTransactionController');

const Controllers = {
	BadgeController,
	AnswerController,
	ItemCategoryController,
	QuestionCategoryController,
	QuestionDifficultyController,
	InventoryController,
	UserController,
	LearningTopicController,
	ItemController,
	LearningItemController,
	ChallengeController,
	AuthController,
	BadgeTransactionController,
	ChallengeTransactionController,
	DifficultyTransactionController,
	LearningTransactionController,
	ItemTransactionController
}

module.exports = Controllers;