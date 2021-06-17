const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (room_id, usr_id) => {
    socket.join(room_id)
    socket.to(room_id).broadcast.emit('usr-connected', usr_id)

    socket.on('disconnect', () => {
      socket.to(room_id).broadcast.emit('usr-disconnected', usr_id)
    })
  })
})

server.listen(3000)
console.log("listening on port 3000...")