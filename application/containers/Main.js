'use strict';

import React from 'react';
import { Component } from 'react';
import OnlineUsers from '../components/OnlineUsers';
import MainWindow from '../components/MainWindow';
import ChatBar from '../components/ChatBar';
import Login from '../components/Login';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';

class Main extends Component {
    render(){
        const {chat, user, usersOnline, sendMessageAction} = this.props;
        return(
            <div>
                <header className='header'>
                    <div className="wrapper">
                        <div>WEB CHAT v. 1.0</div>
                        <Login user = {user}/>
                    </div>
                </header>
                <div className='container'>
                    <aside>
                        <OnlineUsers users = {usersOnline}/>
                    </aside>
                    <MainWindow messages = {chat.messages}/>
                </div>
                <ChatBar sendMessage = {sendMessageAction}/>
                <footer>
                    <p>All rights reserved velichkopu@gmail.com</p>
                </footer>
            </div>
            )
    }
}

const mapStateToProps = store => {
    console.log(store);
    return {
        chat: store.chat,
        user: store.user,
        usersOnline: store.usersOnline
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendMessageAction: message => dispatch(sendMessage(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);