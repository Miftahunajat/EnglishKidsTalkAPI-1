const LearningTopic = require('../models').LearningTopic;
const QuestionDifficulty = require('../models').QuestionDifficulty;
const QuestionCategory = require('../models').QuestionCategory;

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
        return LearningTopic
        .create({
            question_category_id: req.body.question_category_id,
            learning_topic_name: req.body.learning_topic_name,
            learning_topic_image: req.file.url
        })
        .then((learningTopic) => res.status(201).send(learningTopic))
        .catch((error) => res.status(400).send(error));
    },
    
    update(req, res) {
        return LearningTopic
        .findById(req.params.id, {
            include: [{
                model: QuestionDifficulty,
                as: 'questionDifficulty'
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
                question_category_id: req.body.question_category_id || learningTopic.question_category_id,
                learning_topic_name: req.body.learning_topic_name || learningTopic.learning_topic_name,
                learning_topic_image: req.file.url || learningTopic.learning_topic_image
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