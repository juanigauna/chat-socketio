function createAlert(data) {
    const id = Math.floor(Math.random() * (100000 - 1) + 1)
    const alert = document.createElement('div')
    alert.id = id
    alert.className = 'alert'
    alert.style.animationDuration = `${data.duration}ms`
    alert.onclick = data.onclick || null
    alert.innerHTML = `
        <p>${data.text}</p>

        <button onclick="document.getElementById(${id}).remove(); return false">Delete</button>
    `
    document.body.appendChild(alert)
    setTimeout(() => alert.remove(), data.duration)
}
function indicate(userId) {
    document.querySelector(`#user-${userId}`).classList.add('user-item-active')
    setTimeout(() => document.querySelector(`#user-${userId}`).classList.remove('user-item-active'), 200);
}
function addNewUser(data) {
    if (document.querySelector(`#user-${data.socketId}`)) return false

    const userItem = document.createElement('div')
    userItem.id = `user-${data.socketId}`
    userItem.className = 'user-item'
    userItem.onclick = () => {
        socket.emit('greet', {
            toSocketId: data.socketId
        })
    }

    const username = document.createElement('a')
    username.id = `username-${data.socketId}`
    username.innerText = null === data.username ? data.socketId : data.username

    const status = document.createElement('p')
    status.id = `status-${data.socketId}`
    status.className = null === data.username && 'danger'
    status.innerText = null === data.username ? 'No username' : 'Online'

    userItem.appendChild(username)
    userItem.appendChild(status)
    document.querySelector('#user-list').appendChild(userItem)
}
function addNewMessage(data) {
    let content = document.querySelector('#message-list'),
        top = Math.round(content.scrollTop),
        reversePos = (content.scrollHeight - content.clientHeight) - top
    if (reversePos <= 5) {
        document.querySelector('#message-list').scrollTo(0, content.scrollHeight)
    }
    const message = document.createElement('div')
    message.id = data.id
    message.className = 'message-wrapper'

    const username = document.createElement('a')
    username.onclick = data.socketId !== socket.id ? () => indicate(data.socketId) : null
    username.innerText = data.username

    const text = document.createElement('p')
    text.innerText = data.text

    message.appendChild(username)
    message.appendChild(text)
    document.querySelector('#message-list').appendChild(message)
}