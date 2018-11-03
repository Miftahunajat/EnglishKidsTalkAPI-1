const express = require('express');
const passport = require('./passport');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');

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

app.use('/api/auth', authRouter);
app.use('/api', passport.authenticate('jwt', {session: false}), indexRouter);

app.use((req, res, next) => {
    let docLink = 'https://editor.swagger.io';
    const error = new Error("Route not found! Please refer to see API documentation " + docLink);
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