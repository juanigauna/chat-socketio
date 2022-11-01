socket.on('pass-users', userList => userList.forEach(data => {
    if (socket.id !== data.socketId) addNewUser(data)
}))
socket.on('user-connected', data => {
    if (socket.id !== data.socketId) addNewUser(data)
})
socket.on('user-setted-username', data => {
    document.querySelector(`#username-${data.socketId}`).innerHTML = data.username
    document.querySelector(`#status-${data.socketId}`).classList.remove('danger')
    document.querySelector(`#status-${data.socketId}`).innerHTML = 'Online'
})
socket.on('user-disconnected', socketId => {
    document.querySelector(`#user-${socketId}`).remove()
})
socket.on('new-message', data => {
    let content = document.querySelector('#message-list'),
        top = Math.round(content.scrollTop),
        reversePos = (content.scrollHeight - content.clientHeight) - top
    addNewMessage(data)
    if (reversePos <= 10) {
        document.querySelector('#message-list').scrollTo(0, content.scrollHeight)
        return 
    }
    createAlert({
        text: `${data.username}: ${data.text}`,
        duration: 3500,
        onclick: () => {
            document.querySelector('#message-list').scrollTo(0, document.querySelector('#message-list').scrollHeight)
        }
    })
})
socket.on('new-greet', data => {
    createAlert({
        text: `${data.username} greeted you! :D`,
        duration: 6000
    })
})