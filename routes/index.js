const express = require('express');
const router = express.Router();

const badgeController = require('../controllers').BadgeController;
const answerController = require('../controllers').AnswerController;
const itemCategoryController = require('../controllers').ItemCategoryController;
const questionCategoryController = require('../controllers').QuestionCategoryController;
const questionDifficultyController = require('../controllers').QuestionDifficultyController;
const inventoryController = require('../controllers').InventoryController;
const userController = require('../controllers').UserController;
const userProfileController = require('../controllers').UserProfileController;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({
        msg: 'Welcome to EnglishKidsTalk API! For the documentation, kindly follow to this link!',
        link: 'editor.swagger.io'
    });
});

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

/* Item Category Router */
router.get('/api/item-categories', itemCategoryController.list);
router.get('/api/item-categories/:id', itemCategoryController.getById);
router.post('/api/item-categories', itemCategoryController.add);
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

/* Question Difficulty Router */
router.get('/api/inventories', inventoryController.list);
router.get('/api/inventories/:id', inventoryController.getById);
router.post('/api/inventories', inventoryController.add);
router.put('/api/inventories/:id', inventoryController.update);
router.delete('/api/inventories/:id', inventoryController.delete);

/* User Router */
router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getById);
router.post('/api/users', userController.add);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.delete);

/* User Profile Router */
router.get('/api/user-profiles', userProfileController.list);
router.get('/api/user-profiles/:id', userProfileController.getById);
router.post('/api/user-profiles', userProfileController.add);
router.put('/api/user-profiles/:id', userProfileController.update);
router.delete('/api/user-profiles/:id', userProfileController.delete);

module.exports = router;