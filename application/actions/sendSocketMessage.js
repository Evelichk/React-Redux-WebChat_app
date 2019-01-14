'use strict';

export function sendSocketMessage(userMessage) {
    return {
        type: 'SEND_SOCKET_MESSAGE',
        playload: userMessage
    }

}