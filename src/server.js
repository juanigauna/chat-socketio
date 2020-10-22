const express = require('express'),
      port = process.env.PORT || 3000
      
let app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    homeRoutes = require('./routes/home')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/', homeRoutes)

require('./events')(io)

http.listen(port, () => {
    console.log('Server listen on port', port)
})