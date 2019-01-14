'use strict';

import React, {Component} from 'react';

export default class ChatBar extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.text.value;
        this.props.sendSocketMessage(message);
        e.target.text.value = '';
    };
    render(){
        return(
                <form className="messenger" onSubmit={this.handleSubmit}>
                    <input className='chat-wind' name='text'  autoComplete="off" placeholder='Type message here...'/>
                    <button type='submit' >Send</button>
                </form>

        )
    }
}