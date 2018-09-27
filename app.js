const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const learningTopicRoutes = require('./api/routes/LearningTopic');
const badgeRoutes = require('./api/routes/Badge');
const itemCategoryRoutes = require('./api/routes/ItemCategory');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Route which need a handling request
app.use('/badges', badgeRoutes);
app.use('/learning-topics', learningTopicRoutes);
app.use('/item-categories', itemCategoryRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;