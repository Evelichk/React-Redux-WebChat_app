'use strict';

import React from 'react';
import {Component} from 'react';

export default class UsersList extends Component{
    render(){
            return(
                <ul className="user_list">
                    {this.props.users.map((users) =>
                        <li key={users.id}>{users.user}</li>
                    )}
                </ul>
            )
    }
}