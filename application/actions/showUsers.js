
let counter = 0;

export function showUsers(user) {
    return {
        type: 'SHOW_USER_LIST',
        id: counter++,
        playload: user
    }
}