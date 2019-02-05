'use strict';

const initialState = {
    users: []
};

export function usersListReducer(state = initialState, action) {
    switch(action.type){
        case 'SHOW_USER_LIST':
            let user = {
                id: action.id,
                user: action.playload
            };
            if (state.users.find((item) => {
                return item.user === user.user
            })) {
                return state
            }
                return {...state, usersList: state.users.push(user)};
        case 'DISCON_USER':
            let index = state.users.indexOf(user);
            return {...state, usersList: state.users.splice(index, 1)};

        default:
            return state
    }
}