const cookie = require('cookie');
const config = require ('../server/config/Index');
const sessionStore = require('libs/sessionStore');
const cookieParser = require('cookie-parser');
const logger = require('../server/logger/logger');
const HttpError = require('../error/HttpError');


module.exports = function (server) {
    const io = require('socket.io')(server);



    function loadUsersList(callback) {
        let sockets = io.sockets.sockets;
        let connectedClients;
        let users = [];

        //Getting user names and users array creation
        let promise = new Promise((resolve, reject) => {
            io.clients((error, clients) => {
                if (error) reject(new HttpError(500, 'Server error'));
                connectedClients = clients;
                resolve(connectedClients)
            });
        });
        promise
            .then(
                result => {
                    connectedClients.forEach((client) => {
                        //Returns if no session found
                        if (!sockets[client].handshake.session) return;
                        users.push(sockets[client].handshake.session.user);
                    });
                    callback(null, users);
                },
                error => {
                    callback(error);
                }
            );
        return users
    }

    io.use((socket, next) => {
                socket.handshake.cookies = cookie.parse(socket.handshake.headers.cookie);
                let sidCookie = socket.handshake.cookies['connect.sid'];
                let sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
                let promise = new Promise((resolve, reject) => {
                    sessionStore.load(sid, (error, session) => {
                        if (error) {
                            reject(error)
                        } else {
                            console.log('session');
                            socket.handshake.session = session;
                            resolve(session)
                        }
                    });
                })
                    .then(() => {
                        next()
                    },error => {
                        logger.error(Promise)
                    })
    });

        io.on('connection', (socket) => {
            loadUsersList((err, users) => {
                io.emit('session:reload', users);
            });
            socket.on('message', (message) => {
                let date = new Date();
                let hours = date.getHours();
                let minuets = date.getMinutes();
                let seconds = date.getSeconds();
                let userMessage = '[' + hours + ':' + minuets + ':' + seconds + ']' + '<' + socket.handshake.session.user + '>' + ' ' + message.text;
                io.emit('userMessage', userMessage);
            });
        });



};




