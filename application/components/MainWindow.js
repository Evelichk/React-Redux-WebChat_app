'use strict';

import React, {Component} from 'react';

export default class MainWindow extends Component{
    render(){
        return(
            <div className="chat_window" >
                <ul className='messageList'>
                    {this.props.messages.map((item, index) =>
                        <li className='message' key={item.id}>{item.text}</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}