const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (data) => {
    console.log('Message from client:', data);
    // 메시지 브로드캐스트 (보낸 클라이언트 ID 포함)
    socket.broadcast.emit('message', { sender: 'other', content: data.content, socketId: socket.id });
  });

  io.emit('userConnected', { socketId: socket.id });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    io.emit('userDisconnected', { socketId: socket.id });
  });
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});