const LearningTopic = require('../models').LearningTopic;
const QuestionCategory = require('../models').QuestionCategory;
const LearningItem = require('../models').LearningItem;

module.exports = {
    list(req, res) {
        return LearningTopic
        .findAll({
            include: [
            {
                model: QuestionCategory,
                as: 'questionCategory'
            }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then((learningTopics) => res.status(200).send(learningTopics))
        .catch((error) => { res.status(400).send(error); });
    },
    
    getById(req, res) {
        return LearningTopic
        .findById(req.params.id, {
            include: [{
                model: QuestionCategory,
                as: 'questionCategory'
            }],
        })
        .then((learningTopic) => {
            if (!learningTopic) {
                return res.status(404).send({
                    message: 'LearningTopic Not Found',
                });
            }
            return res.status(200).send(learningTopic);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    add(req, res) {
        let question_category_id = req.body.question_category_id;
        let learning_topic_name = req.body.learning_topic_name;
        let learning_topic_image = req.file.url;
        if (!question_category_id || !learning_topic_name || !learning_topic_image) {
            res.status(404).send({'msg': 'Field cannot be null!'});
        } else {
            return LearningTopic
            .create({
                question_category_id: question_category_id,
                learning_topic_name: learning_topic_name,
                learning_topic_image: learning_topic_image
            })
            .then((learningTopic) => res.status(201).send(learningTopic))
            .catch((error) => res.status(400).send(error));
        }
    },
    
    update(req, res) {
        let question_category_id = req.body.question_category_id;
        let learning_topic_name = req.body.learning_topic_name;
        let learning_topic_image = null;
        if (req.file) {
            learning_topic_image = req.file.url;
        }
        return LearningTopic
        .findById(req.params.id, {
            include: [{
                model: LearningItem,
                as: 'learningItems'
            },{
                model: QuestionCategory,
                as: 'questionCategory'
            }],
        })
        .then(learningTopic => {
            if (!learningTopic) {
                return res.status(404).send({
                    message: 'LearningTopic Not Found',
                });
            }
            return learningTopic
            .update({
                question_category_id: question_category_id || learningTopic.question_category_id,
                learning_topic_name: learning_topic_name || learningTopic.learning_topic_name,
                learning_topic_image: learning_topic_image || learningTopic.learning_topic_image
            })
            .then(() => res.status(200).send(learningTopic))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    
    delete(req, res) {
        return LearningTopic
        .findById(req.params.id)
        .then(learningTopic => {
            if (!learningTopic) {
                return res.status(400).send({
                    message: 'LearningTopic Not Found',
                });
            }
            return learningTopic
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
};