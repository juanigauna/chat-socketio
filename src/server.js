const express = require('express'),
      port = process.env.PORT || 3000
      
let app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    dashboardRoutes = require('./routes/dashboard'),
    handleWordsRoutes = require('./routes/handleWords')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/', dashboardRoutes)
app.use('/words', handleWordsRoutes)

require('./events')(io)

http.listen(port, () => {
    console.log('Server listen on port', port)
})