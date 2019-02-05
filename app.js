'use strict';
const express = require('express');
let app = express();
const http = require('http').Server(app);
const config = require ('./server/config/Index');
const logger = require('./server/logger/logger');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const HttpError = require('./error/HttpError');
const session = require('express-session');
const registration = require('./routes/registration');
const checklogin = require('./routes/checklogin');
const auth = require('./routes/auth');
const main = require('./routes/main');
const front = require('./routes/index');
const username = require('./routes/username');



app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());

const sessionStore = require('libs/sessionStore');
//initializing session connection
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    store: sessionStore
}));

app.use(express.static(__dirname +'/public'));

//saving __dirname global into res.locals variable for using in routes middlewares
app.use((req, res, next) => {
    res.locals.dirname = __dirname;
    next()
});

//application routing middleware
app.use(checklogin, auth,  username, registration, main );

app.use((err, req, res, next ) => {
    if (err instanceof HttpError){
        return res.sendStatus(err.code);
    }
        logger.error(err.code + ' ' + err.message);
        res.status(500);
        res.send('Error:' + err.message)

});
http.listen(config.get('port'), function(){
    logger.info('Server started working on port ' + config.get('port'))
    }
);
const io = require('./socket')(http);