
export function sendSocketMessage(userMessage, userName) {
    return {
        type: 'SEND_SOCKET_MESSAGE',
        playload: {
            text: userMessage,
            user: userName
        }
    }

}