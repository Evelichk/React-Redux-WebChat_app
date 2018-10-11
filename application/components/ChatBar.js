'use strict';

import React, {Component} from 'react';

export default class ChatBar extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target.text.value;
        this.props.sendMessage({id: +Date.now(), text: value});
        e.target.text.value = '';

    };
    render(){
        const {message} = this.props;
        return(
                <form className="messenger" onSubmit={this.handleSubmit}>
                    <input className='chat-wind' name='text'  placeholder='Type message here...'/>
                    <button type='submit' >Send</button>
                </form>

        )
    }
}