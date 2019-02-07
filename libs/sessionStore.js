const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require ('../server/config/Index');
const logger = require('../server/logger/logger');

let sessionStore = new MongoDBStore({
    uri: config.get('mongoose:uri'),
    collection: 'sessions'
});
sessionStore.on('error', (error) => {
    logger.error('Session store error: ' + error);
});

module.exports = sessionStore;