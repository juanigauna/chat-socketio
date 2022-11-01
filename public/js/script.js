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
        return
    }
    createAlert({
        text: 'Please, fill the field.',
        duration: 3500
    })
})
document.querySelector('#send-message').addEventListener('submit', e => {
    e.preventDefault()
    let text = document.querySelector('#message').value.trim()
    if (text.length > 0) {
        socket.emit('new-message', { text: text })
        document.querySelector('#send-message').reset()
        return
    }
    createAlert({
        text: 'Write something...',
        duration: 3500
    })
})
let content = document.querySelector('#message-list')
content.addEventListener('scroll', event => {
    let content = document.querySelector('#message-list'),
        top = content.scrollTop,
        height = content.scrollHeight - content.clientHeight
    console.log(height - Math.round(event.target.scrollTop))
})