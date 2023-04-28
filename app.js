const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'cliente')));

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  // Procedimiento 4:
  socket.on('chat', (msg) => {
    console.log('Mensaje: ' + msg);
    io.emit('chat', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'index.html'));
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
