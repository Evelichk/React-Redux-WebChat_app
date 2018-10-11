'use strict';

import React from 'react';
import {Component} from 'react';

export default class OnlineUsers extends Component{
    render(){
        return(
            <ul className="user_list">
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        )
    }
}