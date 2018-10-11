'use strict';
const initialState = {
    messages: [{id:1, text: 'Welcome to the chat application'}]
};

export function chatReducer(state = initialState, action) {
    switch (action.type){
        case 'SEND_MESSAGE':
            return {...state, chat: state.messages.push(action.playload)};

        default:
            return state
    }
}