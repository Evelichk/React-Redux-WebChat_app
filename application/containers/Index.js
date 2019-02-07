'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../store/configStore';
import Routing from "./Routing";

render(
    <Provider store = {store}>
        <Routing/>
    </Provider>
, document.getElementById('root'));