const cookie = require('cookie');
const config = require ('../server/config/Index');
const sessionStore = require('libs/sessionStore');
const cookieParser = require('cookie-parser');
const logger = require('../server/logger/logger');
const HttpError = require('../error/HttpError');
const messenger = require('../libs/messageCreator');


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
                        if (!sockets[client].handshake.session) reject(new HttpError(401, 'Unauthorized'));
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
        //Parsing session cookie and geting session id
        socket.handshake.cookies = cookie.parse(socket.handshake.headers.cookie);
        let sidCookie = socket.handshake.cookies['connect.sid'];
        let sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
        //Loading user name using sid from session store and saving it to session.handshake
        let promise = new Promise((resolve, reject) => {
            sessionStore.load(sid, (error, session) => {
                if (error) {
                    reject(new HttpError(500, 'Server error'))
                } else {
                    socket.handshake.session = session;
                    resolve(session)
                }
            });
        })
            .then(() => {
                next()
            },error => {
                logger.error(error)
            })
    });

        io.on('connection', (socket) => {
            let user = socket.handshake.session.user;
            logger.info('Connected new user' + user);
            loadUsersList((err, users) => {
                if (err) {
                    logger.error(err);
                    socket.disconnect()
                }
                io.emit('session:reload', users);
            });
            socket.on('message', (message) => {
                let userMessage = messenger(user, message.text);
                io.emit('userMessage', userMessage);
            });
            socket.on('disconnect', (reason) => {
                console.log('discon: ' + user);
                let systemMessage = messenger('System', user + ' has left the webchat');
                io.emit('userMessage', systemMessage);
                io.emit('disconnect_user', user)
            });
            socket.on('error', (error) => {
                logger.error('Socket error: ' + error);
                socket.disconnect()
            })

        });
};




