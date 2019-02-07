'use strict';

//Adds '0' if value < 10
function leadingZero(param) {
    if (param < 10) {
        return '0' + param
    } else {
        return param
    }
}
//create messages with timestamp and user name for socket
function messenger(userName, message) {
    let date = new Date();
    let hours = leadingZero(date.getHours());
    let minuets = leadingZero(date.getMinutes());
    let seconds = leadingZero(date.getSeconds());
    return '[' + hours + ':' + minuets + ':' + seconds + ']' + '<' + userName + '>' + ' ' + message;
}

module.exports = messenger;