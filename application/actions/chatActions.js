'use strict';

export function sendMessage(message) {
    return {
        type: 'SEND_MESSAGE',
        playload: message
    }
    
}