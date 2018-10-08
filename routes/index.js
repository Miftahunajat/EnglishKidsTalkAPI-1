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
        link: 'editor.swagger.io'
    });
});

/* User Router */
router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getById);
router.post('/api/users/register', upload.none(), userController.add);
router.post('/api/users/login', upload.none(), userController.login);
router.put('/api/users/:id', upload.none(), userController.update);
router.delete('/api/users/:id', userController.delete);

router.post('/api/users/add-badge', upload.none(), userController.addBadge);
router.post('/api/users/add-learning-item', upload.none(), userController.addLearningItem);
router.post('/api/users/add-challenge', upload.none(), userController.addChallenge);

/* Learning Item Router */
router.get('/api/learning-items', learningItemController.list);
router.get('/api/learning-items/:id', learningItemController.getById);
router.post('/api/learning-items', upload.single("learning_item_image"), learningItemController.add);
router.put('/api/learning-items/:id', upload.single("learning_item_image"), learningItemController.update);
router.delete('/api/learning-items/:id', learningItemController.delete);

/* Challenge Router */
router.get('/api/challenges', challengeController.list);
router.get('/api/challenges/:id', challengeController.getById);
router.post('/api/challenges', upload.single("challenge_image"), challengeController.add);
router.put('/api/challenges/:id', upload.single("challenge_image"), challengeController.update);
router.delete('/api/challenges/:id', challengeController.delete);

/* Item Router */
router.get('/api/items', itemController.list);
router.get('/api/items/:id', itemController.getById);
router.post('/api/items', upload.single("image"), itemController.add);
router.put('/api/items/:id', upload.single("image"), itemController.update);
router.delete('/api/items/:id', itemController.delete);

/* Item Category Router */
router.get('/api/item-categories', itemCategoryController.list);
router.get('/api/item-categories/:id', itemCategoryController.getById);
router.post('/api/item-categories', upload.single("item_category_image"), itemCategoryController.add);
router.put('/api/item-categories/:id', itemCategoryController.update);
router.delete('/api/item-categories/:id', itemCategoryController.delete);

/* Question Category Router */
router.get('/api/question-categories', questionCategoryController.list);
router.get('/api/question-categories/:id', questionCategoryController.getById);
router.post('/api/question-categories', questionCategoryController.add);
router.put('/api/question-categories/:id', questionCategoryController.update);
router.delete('/api/question-categories/:id', questionCategoryController.delete);

/* Question Difficulty Router */
router.get('/api/question-difficulties', questionDifficultyController.list);
router.get('/api/question-difficulties/:id', questionDifficultyController.getById);
router.post('/api/question-difficulties', questionDifficultyController.add);
router.put('/api/question-difficulties/:id', questionDifficultyController.update);
router.delete('/api/question-difficulties/:id', questionDifficultyController.delete);

/* Learning Topic Router */
router.get('/api/learning-topics', learningTopicController.list);
router.get('/api/learning-topics/:id', learningTopicController.getById);
router.post('/api/learning-topics', upload.single("learning_topic_image"), learningTopicController.add);
router.put('/api/learning-topics/:id', upload.single("learning_topic_image"), learningTopicController.update);
router.delete('/api/learning-topics/:id', learningTopicController.delete);

/* Badge Router */
router.get('/api/badges', badgeController.list);
router.get('/api/badges/:id', badgeController.getById);
router.post('/api/badges', badgeController.add);
router.put('/api/badges/:id', badgeController.update);
router.delete('/api/badges/:id', badgeController.delete);

/* Answer Router */
router.get('/api/answers', answerController.list);
router.get('/api/answers/:id', answerController.getById);
router.post('/api/answers', answerController.add);
router.put('/api/answers/:id', answerController.update);
router.delete('/api/answers/:id', answerController.delete);

/* Question Difficulty Router */
router.get('/api/inventories', inventoryController.list);
router.get('/api/inventories/:id', inventoryController.getById);
router.post('/api/inventories', inventoryController.add);
router.put('/api/inventories/:id', inventoryController.update);
router.delete('/api/inventories/:id', inventoryController.delete);

/* Advance Router */
router.get('/routes', (req, res) => {res.status(200).json(router.stack)});

module.exports = router;