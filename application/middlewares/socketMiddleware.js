'use strict';
import io from 'socket.io-client';
import { socketMessage } from "../actions/socketMessage";
import {addUser} from "../actions/addUser";

export const socketMiddleware = (store) => {

    const socket = io.connect('http://localhost:3000');


    socket.on('userMessage', (userMessage) => {
        store.dispatch(socketMessage(userMessage));
        console.log('MESSAGE_RECEIVED')

    });
    socket.on('userConnect', (username) => {
        console.log('user connected');
        store.dispatch(addUser(username));
        console.log('USER_JOINED_CHAT')
    });

    return next => action => {
        switch (action.type){
            case 'SEND_SOCKET_MESSAGE':
                console.log(socket)
                socket.session.login = '123345'
                socket.emit('message', action.playload);
                break;
            default: break
        }
        return next (action)
    }


};
