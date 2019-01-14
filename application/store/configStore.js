'use strict';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux'
import {rootReducer} from '../reducers/Index';
import { socketMiddleware } from '../middlewares/socketMiddleware'



const store = createStore(rootReducer, applyMiddleware(socketMiddleware));

module.exports.store = store;