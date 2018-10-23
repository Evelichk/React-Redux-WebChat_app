'use strict';
const express = require('express');
const config = require ('./server/config/Index');
const logger = require('./server/logger/logger');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const User = require('./models/user').User;
const AuthError = require('./error/AuthError');
const HttpError = require('./error/HttpError');

let app = express();

app.use(express.static(__dirname +'/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());

app.get('/webchat', (req, res) => {
   res.sendFile(__dirname + '/public/index.html')
});

app.post('/register', upload.none(), (req, res, next) => {
    let username = req.body.login;
    let email = req.body.email;
    let password = req.body.password;
    User.register(username, email, password, function(err, user) {
        if(err){
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            }else {
               return next(err)
            }
        } else {
            res.status(200);
            res.end()
        }
    });
});
app.post('/validlogin', upload.none(), (req, res, next) => {
    res.status(200);
    res.end();
});

app.post('/login', (req, res, next) => {
    res.status(200);
    res.end();
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.use((err, req, res, next ) => {
    if (err instanceof HttpError){
        logger.error(err.code + ' ' + err.message);
        return res.sendStatus(err.code);
    }
        logger.error(err.code + ' ' + err.message);
        res.status(500);
        res.send('Error:' + err.message)

});
app.listen(config.get('port'), function(){
    logger.info('Server started working on port ' + config.get('port'))
    }
);