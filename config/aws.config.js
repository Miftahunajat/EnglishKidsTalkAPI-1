const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: 'tdn',
    accessKeyId: 'tdn',
    region: 'us-east-1'
});

module.exports = aws;