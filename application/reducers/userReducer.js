'use strict';

const initialState = {
  username: ''
};

export function userReducer(state = initialState, action) {
    switch(action.type){
        case 'SHOW_USER':
            return {...state, username: action.playload};
        default:
            return state
    }
}