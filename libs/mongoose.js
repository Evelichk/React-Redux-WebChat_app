'use strict';

const mongoose = require('mongoose');
const config = require('../server/config/index');
const logger = require('../server/logger/logger');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connection.on('connected', () => {
    logger.info('DB Connection estabilished to ' + config.get('mongoose:options:dbName') + ' database')
});
mongoose.connection.on('error', (err) => {
    mongoose.connection.close();
    logger.error('Mongoose Connection ERROR to DB: ' + err.message);
});
module.exports = mongoose;