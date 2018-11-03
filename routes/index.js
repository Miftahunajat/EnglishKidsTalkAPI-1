const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');

const badgeController = require('../controllers').BadgeController;
const answerController = require('../controllers').AnswerController;
const itemCategoryController = require('../controllers').ItemCategoryController;
const questionCategoryController = require('../controllers').QuestionCategoryController;
const questionDifficultyController = require('../controllers').QuestionDifficultyController;
const inventoryController = require('../controllers').InventoryController;
const userController = require('../controllers').UserController;
const learningTopicController = require('../controllers').LearningTopicController;
const itemController = require('../controllers').ItemController;
const learningItemController = require('../controllers').LearningItemController;
const challengeController = require('../controllers').ChallengeController;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msg: 'Welcome to EnglishKidsTalk API! For the documentation, kindly follow to this link!',
        link: 'https://documenter.getpostman.com/view/3186416/RWgwQvKL'
    });
});

/* User Router */
router.get('/users', userController.list);
router.get('/users/:id', userController.getById);
router.patch('/users/:id', upload.none(), userController.update);
router.delete('/users/:id', userController.delete);
router.post('/users/add-badge', upload.none(), userController.addBadge);
router.post('/users/add-learning-item', upload.none(), userController.addLearningItem);
router.post('/users/add-challenge', upload.none(), userController.addChallenge);
router.post('/users/add-question-difficulty', upload.none(), userController.addQuestionDifficulty);


/* Learning Item Router */
router.get('/learning-items', learningItemController.list);
router.get('/learning-items/:id', learningItemController.getById);
router.post('/learning-items', upload.single("learning_item_image"), learningItemController.add);
router.patch('/learning-items/:id', upload.single("learning_item_image"), learningItemController.update);
router.delete('/learning-items/:id', learningItemController.delete);

/* Challenge Router */
router.get('/challenges', challengeController.list);
router.get('/challenges/:id', challengeController.getById);
router.post('/challenges', upload.single("challenge_image"), challengeController.add);
router.patch('/challenges/:id', upload.single("challenge_image"), challengeController.update);
router.delete('/challenges/:id', challengeController.delete);

/* Item Router */
router.get('/items', itemController.list);
router.get('/items/:id', itemController.getById);
router.post('/items', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'snippet', maxCount: 1}
]), itemController.add);
router.patch('/items/:id', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'snippet', maxCount: 1}
]), itemController.update);
router.delete('/items/:id', itemController.delete);

/* Item Category Router */
router.get('/item-categories', itemCategoryController.list);
router.get('/item-categories/:id', itemCategoryController.getById);
router.post('/item-categories', upload.single("item_category_image"), itemCategoryController.add);
router.patch('/item-categories/:id', upload.single("item_category_image"), itemCategoryController.update);
router.delete('/item-categories/:id', itemCategoryController.delete);

/* Question Category Router */
router.get('/question-categories', questionCategoryController.list);
router.get('/question-categories/:id', questionCategoryController.getById);
router.post('/question-categories', upload.none(), questionCategoryController.add);
router.patch('/question-categories/:id', upload.none(), questionCategoryController.update);
router.delete('/question-categories/:id', questionCategoryController.delete);

/* Question Difficulty Router */
router.get('/question-difficulties', questionDifficultyController.list);
router.get('/question-difficulties/:id', questionDifficultyController.getById);
router.post('/question-difficulties', upload.none(), questionDifficultyController.add);
router.patch('/question-difficulties/:id', upload.none(), questionDifficultyController.update);
router.delete('/question-difficulties/:id', questionDifficultyController.delete);

/* Learning Topic Router */
router.get('/learning-topics', learningTopicController.list);
router.get('/learning-topics/:id', learningTopicController.getById);
router.post('/learning-topics', upload.single("learning_topic_image"), learningTopicController.add);
router.patch('/learning-topics/:id', upload.single("learning_topic_image"), learningTopicController.update);
router.delete('/learning-topics/:id', learningTopicController.delete);

/* Badge Router */
router.get('/badges', badgeController.list);
router.get('/badges/:id', badgeController.getById);
router.post('/badges', upload.single("badge_image") ,badgeController.add);
router.patch('/badges/:id', upload.single("badge_image"), badgeController.update);
router.delete('/badges/:id', badgeController.delete);

/* Answer Router */
router.get('/answers', answerController.list);
router.get('/answers/:id', answerController.getById);
router.post('/answers', upload.none(), answerController.add);
router.patch('/answers/:id', upload.none(), answerController.update);
router.delete('/answers/:id', answerController.delete);

/* Inventory Router */
router.get('/inventories', inventoryController.list);
router.get('/inventories/:id', inventoryController.getById);
router.post('/inventories', inventoryController.add);
router.patch('/inventories/:id', inventoryController.update);
router.delete('/inventories/:id', inventoryController.delete);

router.post('/inventories/add-item', upload.none(), inventoryController.addItem);
router.post('/inventories/activate-item', upload.none(), inventoryController.activateItem);

module.exports = router;