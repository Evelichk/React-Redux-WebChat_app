'use strict';

import React from 'react';
import { Component } from 'react';
import UsersList from '../components/UsersList';
import MainWindow from '../components/MainWindow';
import ChatBar from '../components/ChatBar';
import Login from '../components/Login';
import { connect } from 'react-redux';
import { sendSocketMessage } from '../actions/sendSocketMessage';
import { showUser } from '../actions/showUser';


class Main extends Component {
//
    render(){
        const { chat, user, usersList, sendSocketMessage, showUser } = this.props;
        return(
            <div>
                <header className='header'>
                    <div className="wrapper">
                        <div>WEB CHAT v. 1.0</div>
                        <Login user = {user} addUser = { showUser }/>
                    </div>
                </header>
                <div className='container'>
                    <aside>
                        <UsersList users = { usersList.users }/>
                    </aside>
                    <MainWindow  messages = { chat.messages }/>
                </div>
                <ChatBar sendSocketMessage = { sendSocketMessage }/>
                <footer>
                    <p>All rights reserved velichkopu@gmail.com</p>
                </footer>
            </div>
            )
    }
}

const mapStateToProps = store => {
    return {
        chat: store.chat,
        user: store.username,
        usersList: store.usersList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendSocketMessage: (message) => dispatch(sendSocketMessage(message)),
        showUser: (username) => dispatch(showUser(username))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);