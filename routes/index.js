const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');

const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msg: 'Welcome to EnglishKidsTalk API! For the documentation, kindly follow to this link!',
        link: 'https://documenter.getpostman.com/view/3186416/RWgwQvKL'
    });
});

/* User Router */
router.get('/users', controllers.UserController.list);
router.get('/users/:id', controllers.UserController.getById);
router.patch('/users/:id', upload.none(), controllers.UserController.update);
router.delete('/users/:id', controllers.UserController.delete);

router.post('/users/:id/badges', upload.none(), controllers.BadgeTransactionController.addBadge);
router.post('/users/:id/learning-items', upload.none(), controllers.LearningTransactionController.addLearningItem);
router.post('/users/:id/challenges', upload.none(), controllers.ChallengeTransactionController.addChallenge);
router.post('/users/:id/question-difficulties', upload.none(), controllers.DifficultyTransactionController.addQuestionDifficulty);

/* Learning Item Router */
router.get('/learning-items', controllers.LearningItemController.list);
router.get('/learning-items/:id', controllers.LearningItemController.getById);
router.post('/learning-items', upload.single("learning_item_image"), controllers.LearningItemController.add);
router.patch('/learning-items/:id', upload.single("learning_item_image"), controllers.LearningItemController.update);
router.delete('/learning-items/:id', controllers.LearningItemController.delete);

/* Challenge Router */
router.get('/challenges', controllers.ChallengeController.list);
router.get('/challenges/:id', controllers.ChallengeController.getById);
router.post('/challenges', upload.single("challenge_image"), controllers.ChallengeController.add);
router.patch('/challenges/:id', upload.single("challenge_image"), controllers.ChallengeController.update);
router.delete('/challenges/:id', controllers.ChallengeController.delete);

/* Item Router */
router.get('/items', controllers.ItemController.list);
router.get('/items/:id', controllers.ItemController.getById);
router.post('/items', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'snippet', maxCount: 1}
]), controllers.ItemController.add);
router.patch('/items/:id', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'snippet', maxCount: 1}
]), controllers.ItemController.update);
router.delete('/items/:id', controllers.ItemController.delete);

/* Item Category Router */
router.get('/item-categories', controllers.ItemCategoryController.list);
router.get('/item-categories/:id', controllers.ItemCategoryController.getById);
router.post('/item-categories', upload.single("item_category_image"), controllers.ItemCategoryController.add);
router.patch('/item-categories/:id', upload.single("item_category_image"), controllers.ItemCategoryController.update);
router.delete('/item-categories/:id', controllers.ItemCategoryController.delete);

/* Question Category Router */
router.get('/question-categories', controllers.QuestionCategoryController.list);
router.get('/question-categories/:id', controllers.QuestionCategoryController.getById);
router.post('/question-categories', upload.none(), controllers.QuestionCategoryController.add);
router.patch('/question-categories/:id', upload.none(), controllers.QuestionCategoryController.update);
router.delete('/question-categories/:id', controllers.QuestionCategoryController.delete);

/* Question Difficulty Router */
router.get('/question-difficulties', controllers.QuestionDifficultyController.list);
router.get('/question-difficulties/:id', controllers.QuestionDifficultyController.getById);
router.post('/question-difficulties', upload.none(), controllers.QuestionDifficultyController.add);
router.patch('/question-difficulties/:id', upload.none(), controllers.QuestionDifficultyController.update);
router.delete('/question-difficulties/:id', controllers.QuestionDifficultyController.delete);

/* Learning Topic Router */
router.get('/learning-topics', controllers.LearningTopicController.list);
router.get('/learning-topics/:id', controllers.LearningTopicController.getById);
router.post('/learning-topics', upload.single("learning_topic_image"), controllers.LearningTopicController.add);
router.patch('/learning-topics/:id', upload.single("learning_topic_image"), controllers.LearningTopicController.update);
router.delete('/learning-topics/:id', controllers.LearningTopicController.delete);

/* Badge Router */
router.get('/badges', controllers.BadgeController.list);
router.get('/badges/:id', controllers.BadgeController.getById);
router.post('/badges', upload.single("badge_image") ,controllers.BadgeController.add);
router.patch('/badges/:id', upload.single("badge_image"), controllers.BadgeController.update);
router.delete('/badges/:id', controllers.BadgeController.delete);

/* Answer Router */
router.get('/answers', controllers.AnswerController.list);
router.get('/answers/:id', controllers.AnswerController.getById);
router.post('/answers', upload.none(), controllers.AnswerController.add);
router.patch('/answers/:id', upload.none(), controllers.AnswerController.update);
router.delete('/answers/:id', controllers.AnswerController.delete);

/* Inventory Router */
router.get('/inventories', controllers.InventoryController.list);
router.get('/inventories/:id', controllers.InventoryController.getById);
router.post('/inventories', controllers.InventoryController.add);
router.patch('/inventories/:id', controllers.InventoryController.update);
router.delete('/inventories/:id', controllers.InventoryController.delete);

router.post('/inventories/:id/items', upload.none(), controllers.ItemTransactionController.addItem);
router.get('/inventories/:id/items/:item_id', upload.none(), controllers.ItemTransactionController.activateItem);

module.exports = router;