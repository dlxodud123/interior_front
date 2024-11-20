// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);

// // CORS를 서버 수준에서 설정
// app.use(cors({
//   origin: 'http://localhost:3000',  // 클라이언트 URL
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// }));

// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000',  // 클라이언트 URL
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // 클라이언트로 메시지 전송
//   socket.emit('message', 'Hello from server!');

//   // 클라이언트로부터 메시지 수신
//   socket.on('sendMessage', (data) => {
//     console.log('Message from client:', data);
//     socket.emit('message', 'Message received!');
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(8080, () => {
//   console.log('Server is running on http://localhost:8080');
// });
