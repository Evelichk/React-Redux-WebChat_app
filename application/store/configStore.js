'use strict';
import { createStore } from 'redux';
import {rootReducer} from '../reducers/Index';


const store = createStore(rootReducer);

module.exports.store = store;