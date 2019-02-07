
let nextMessageId = 0;

export function socketMessage(userMessage) {
    return {
        type: 'SOCKET_MESSAGE_RECEIVED',
        id: +Date.now(),
        playload: userMessage
    }

}