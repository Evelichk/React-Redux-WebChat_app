const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require ('../server/config/Index');

let sessionStore = new MongoDBStore({
    uri: config.get('mongoose:uri'),
    collection: 'sessions'
});

module.exports = sessionStore;