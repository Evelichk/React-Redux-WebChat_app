'use strict';
const express = require('express');
const config = require ('./server/config/Index');
const logger = require('./server/logger/logger');

let app = express();

app.use(express.static(__dirname +'/public'));

app.get('/webchat', (req, res) => {
   res.sendFile(__dirname + '/public/index.html')
});
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});
app.post('/register', (req, res) => {
    console.log('data sent');
    res.status(200);
    res.end();
});
app.post('/validlogin', (req, res) => {
    console.log('requested login');
    res.status(403);
    res.end();

});
app.listen(config.get('port'), function(){
    logger.info('Server started working on port ' + config.get('port'))
    }
);