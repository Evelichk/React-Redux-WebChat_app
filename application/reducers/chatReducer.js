'use strict';
const initialState = {
    messages: [{id:1, text: 'Welcome to the chat application'}]
};

export function chatReducer(state = initialState, action) {
    switch (action.type){
        case 'SOCKET_MESSAGE_RECEIVED':
            return {...state, chat: state.messages.push({id: action.id, text: action.playload})};

        default:
            return state
    }
}