
let counter = 0;

export function addUser(username) {
    return {
        type: 'ADD_USER',
        id: counter++,
        playload: username
    }

}