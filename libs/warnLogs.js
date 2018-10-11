'use strict';

export function messenger(field) {
    let message;
    switch (field){
        case 'login':
            message = 'Login is already in use';
            break;
        case 'email':
            message = 'E-mail is invalid';
            console.log('Shit');
            break;
        case 'password':
            message = 'Password too short';
            break;
        case 'checkPass':
            message = 'Password and check password doesn\'t match';
            break;
        default: break
    }
    return message;

}