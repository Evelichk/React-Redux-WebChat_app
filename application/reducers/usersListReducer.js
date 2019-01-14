'use strict';

const initialState = {
    users: []
};

export function usersListReducer(state = initialState, action) {
    switch(action.type){
        case 'ADD_USER':
            return {...state, usersList: state.users.push({id: action.id, user: action.playload})};
        default:
            return state
    }
}