'use strict';
import io from 'socket.io-client';
import {socketMessage} from "../actions/socketMessage";
import {addUser} from "../actions/showUsers";
import {showUsers} from "../actions/showUsers";
import {discon_user} from "../actions/discon_user";
import {sortUserList} from "../actions/sortUserList";

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
                console.log('CONNECTED_SOCKET_SERVER');
                socket.on('userMessage', (userMessage) => {
                    store.dispatch(socketMessage(userMessage));
                    console.log('MESSAGE_RECEIVED')
                });
                socket.on('session:reload', (users) => {
                    if (users){
                        users.forEach((user) => {
                            store.dispatch(showUsers(user));
                            store.dispatch(sortUserList());
                        })
                    }
                });
                socket.on('disconnect_user', (user) => {
                    console.log('DISCONNECTED_USER: ' + user);
                    store.dispatch(discon_user(user));
                    store.dispatch(sortUserList());
                });
                socket.on('connect_error', (error) => {

                });
                break;
            default: break
        }
        return next (action)
    }


};
