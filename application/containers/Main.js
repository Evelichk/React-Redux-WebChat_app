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
import { connectSocket } from "../actions/connectSocket";
import {resetUserList} from "../actions/resetUserList";


class Main extends Component {

    render(){
        const { chat, user, usersList, sendSocketMessage, showUser, socketConnect, resetUserList } = this.props;
        return(
            <div>
                <header className='header'>
                    <div className="wrapper">
                        <div>WEB CHAT v. 1.0</div>
                        <Login user = { user } addUser = { showUser } connect = { socketConnect }/>
                    </div>
                </header>
                <div className='container'>
                    <aside>
                        <UsersList users = { usersList.users }/>
                    </aside>
                    <MainWindow  messages = { chat.messages }/>
                </div>
                <ChatBar sendSocketMessage = { sendSocketMessage } user = { user }/>
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
        sendSocketMessage: (text, userName) => dispatch(sendSocketMessage(text, userName)),
        showUser: (username) => dispatch(showUser(username)),
        socketConnect: () => dispatch(connectSocket()),
        resetUserList: () => dispatch(discon_user())
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);