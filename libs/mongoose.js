'use strict';

const mongoose = require('mongoose');
const config = require('../server/config/index');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connection.on('connected', () => {
    console.log('DB Connection estabilished to ' + config.get('mongoose:options:dbName') + ' database')
});
mongoose.connection.on('error', (err) => {
    mongoose.connection.close();
    console.log('Mongoose Connection ERROR to DB: ' + err.message);
});
module.exports = mongoose;