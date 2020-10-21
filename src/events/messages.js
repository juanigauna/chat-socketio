module.exports = data => {
    let { socket, messages }
    socket.on('new-message', data => {
        let messageId = uuid()

        const message = {
            id: messageId,
            socketId: socket.id,
            username: getUsername(socket.id),
            text: data.text
        }
        messages.push(message)
        io.sockets.emit('new-message', message)
    })
}