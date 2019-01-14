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
const MongoDBStore = require('connect-mongodb-session')(session);
const registration = require('./routes/registration');
const checklogin = require('./routes/checklogin');
const auth = require('./routes/auth');
const main = require('./routes/main');
const front = require('./routes/index');
const username = require('./routes/username');
const io = require('socket.io')(http);


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
let author;

//initializing session connection
app.use(session({
    secret: config.get('session:secret'),
    cookie: config.get('session:cookie'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    store: new MongoDBStore({
        uri: config.get('mongoose:uri'),
        collection: 'sessions'
    })

}));
app.use(express.static(__dirname +'/public'));

//saving __dirname global into res.locals variable for using in routes middlewares
//and session user for using it as author in respose message
app.use((req, res, next) => {
    res.locals.dirname = __dirname;
    author = req.session.user;
    next()
});

//application routing middleware
app.use(checklogin,  username, registration, auth, main, front);

//saving

io.use((socket, next) => {
    let handshakeData = socket.request;
    next()
});
io.on('connection', (socket) => {

    socket.on('message', (message) => {
        console.log(socket.request.username)
        let date = new Date();
        let hours = date.getHours();
        let minuets = date.getMinutes();
        let seconds = date.getSeconds();
        let userMessage = '[' + hours + ':' + minuets + ':' + seconds + ']' + '<' + author + '>' + ' ' + message;
        socket.emit('userMessage', userMessage);
    })
});


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