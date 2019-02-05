'use strict';
import io from 'socket.io-client';
import { socketMessage } from "../actions/socketMessage";
import {addUser} from "../actions/showUsers";
import {showUsers} from "../actions/showUsers";
import {discon_user} from "../actions/resetUserList";

export const socketMiddleware = store => {
    let socket;
    return next => action => {
        switch (action.type){
            case 'SEND_SOCKET_MESSAGE':
                console.log('MESSAGE_SENT');
                socket.emit('message', action.playload);
                break;
            case 'CONNECT':
                socket = io.connect('http://localhost:3000');
                console.log('connected');
                socket.on('userMessage', (userMessage) => {
                    store.dispatch(socketMessage(userMessage));
                    console.log('MESSAGE_RECEIVED')

                });
                socket.on('session:reload', (users) => {
                    if (users){
                        users.forEach((user) => {
                            store.dispatch(showUsers(user))
                        })
                    }
                });
                socket.on('disconnect_user', (user) => {
                    console.log('disconnected: ' + user);
                    store.dispatch(discon_user(user))
                });
                break;
            default: break
        }
        return next (action)
    }


};
