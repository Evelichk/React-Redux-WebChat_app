'use strict';
import { combineReducers } from 'redux';
import { chatReducer } from './chatReducer'
import { userReducer } from './userReducer';
import { usersListReducer } from './usersListReducer';


export const rootReducer = combineReducers({
    username: userReducer,
    usersList: usersListReducer,
    chat: chatReducer
});