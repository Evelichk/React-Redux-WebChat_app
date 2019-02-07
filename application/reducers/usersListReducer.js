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
            if (state.users.find((userObject) => {
                return userObject.user === user.user
            })) {
                return state
            }
                return {...state, usersList: state.users.push(user)};
        case 'DISCON_USER':
            let searchedUser = state.users.find((userObject) => {
                return userObject.user === action.playload
            });
            let index = state.users.indexOf(searchedUser);
            return {...state, usersList: state.users.splice(index, 1).sort()};
        case 'SORT':
            //Sorting function for userList array, returns sorted array from a to z
            return {...state, usersList: state.users.sort((a, b) => {
                if (a.user > b.user) {
                    return 1
                }
                if (a.user < b.user) {
                    return -1
                }
                return 0
                })};
        default:
            return state
    }
}