document.querySelectorAll('input').forEach(input => {
    document.querySelector(`#${input.id}`).addEventListener('focus', () => {
        if (document.querySelector(`#label-${input.id}`)) {
            document.querySelector(`#label-${input.id}`).className = 'field-label field-label-focus'
        }
    })
    document.querySelector(`#${input.id}`).addEventListener('focusout', () => {
        if (document.querySelector(`#label-${input.id}`)) {
            document.querySelector(`#label-${input.id}`).className = 'field-label'
        }
    })
})
document.querySelectorAll('textarea').forEach(textarea => {
    document.querySelector(`#${textarea.id}`).addEventListener('focus', () => {
        if (document.querySelector(`#label-${textarea.id}`)) {
            document.querySelector(`#label-${textarea.id}`).className = 'field-label field-label-focus'
        }
    })
    document.querySelector(`#${textarea.id}`).addEventListener('focusout', () => {
        if (document.querySelector(`#label-${textarea.id}`)) {
            document.querySelector(`#label-${textarea.id}`).className = 'field-label'
        }
    })
})
document.querySelector('#set-username').addEventListener('submit', e => {
    e.preventDefault()
    let username = document.querySelector('#username').value.trim()
    if (username.length > 0) {
        socket.emit('set-username', { username: username })
        createAlert({
            text: 'You logged in successfully!',
            duration: 3500
        })
        document.querySelector('#set-username').className = 'd-none'
        document.querySelector('#wrapper-main').className = 'd-flex jc-space-around a-items-start pd-main'
        return true
    }
    createAlert({
        text: 'Please, fill the field.',
        duration: 3500
    })
    return false
})
document.querySelector('#send-message').addEventListener('submit', e => {
    e.preventDefault()
    let text = document.querySelector('#message').value.trim()
    if (text.length > 0) {
        socket.emit('new-message', { text: text })
        document.querySelector('#send-message').reset()
        return true
    }
    createAlert({
        text: 'Write something...',
        duration: 3500
    })
    return false
})
socket.on('pass-users', userList => {
    userList.forEach(data => {
        if (socket.id !== data.socketId) addNewUser(data)
    })
})
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
    addNewMessage(data)
    document.querySelector('#message-list').scrollTo(0,document.querySelector('#message-list').scrollHeight)
})
socket.on('new-greet', data => {
    createAlert({
        text: `${data.username} greeted you! :D`,
        duration: 6000
    })
})