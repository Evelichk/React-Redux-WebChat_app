'use strict';

import React, {Component} from 'react';
import {warner} from "../../libs/warner";

export default class Login extends Component{

    componentDidMount(){
        const options = {
            method: 'GET',
            cache: 'default',
        };
        //fetching username immidiately after component mounted
        fetch('/username', options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.props.addUser(data.username);
            })
            .catch((error) => {
                console.log(error);
                warner(false, 'submit','Sorry it seems something went wrong. Please try again later')
            })
    }
    render(){
        return(
            <div className="user">
                {this.props.user.username}
            </div>
        )
    }
}
