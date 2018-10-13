'use strict';

//returns message based on element where validation failed
export function messenger(field) {
    let message;
    switch (field){
        case 'login':
            message = 'Login is already in use';
            break;
        case 'email':
            message = 'E-mail is invalid';
            break;
        case 'password':
            message = 'Password too short';
            break;
        case 'checkPass':
            message = 'Password and check password doesn\'t match';
            break;
        case 'submit':
            message =  'Sorry it seems something went wrong. Please try again later';
            break;
        case 'loginFailed':
            message = 'Sorry, Login validation failed. Please try again later';
            break;
        default: break
    }
    return message;

}