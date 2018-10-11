'use strict';
import {combineReducers} from 'redux';
import {chatReducer} from './chatReducer'
import {userReducer} from './userReducer';
import {usersReducer} from './usersOnlineReducer';


export const rootReducer = combineReducers({
    user: userReducer,
    usersOnline: usersReducer,
    chat: chatReducer
});