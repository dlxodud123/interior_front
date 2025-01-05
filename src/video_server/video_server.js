const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // 허용할 도메인 설정
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // CORS 미들웨어 사용

let waitingQueue = []; // 대기중인 사용자 리스트
let rooms = {}; // 방을 저장할 객체
let roomCounter = 0; // 방 번호를 위한 카운터

// 클라이언트 연결 시 처리
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 사용자가 'start-room'을 클릭하면 대기열에 추가하고, 대기자가 2명일 때 방을 생성
  socket.on("start-room", () => {
    console.log("User is trying to join room:", socket.id);
    
    waitingQueue.push(socket.id);

    // 대기열에 2명이 들어오면 방을 생성
    if (waitingQueue.length === 2) {
      roomCounter++; // 새로운 방 번호 생성
      const roomId = `room-${roomCounter}`;

      // 두 사용자를 같은 방에 추가
      const user1 = waitingQueue[0];
      const user2 = waitingQueue[1];

      rooms[roomId] = new Set([user1, user2]);

      // 두 사용자에게 동일한 방을 전송
      io.to(user1).emit("join-room", roomId);
      io.to(user2).emit("join-room", roomId);

      console.log(`Room ${roomId} created with users: ${user1}, ${user2}`);

      // 대기열 초기화
      waitingQueue = [];
    }
  });

  // 사용자가 offer를 보낼 때 처리
  socket.on("send-offer", (offer, roomId) => {
    const users = Array.from(rooms[roomId]);
    users.forEach(userId => {
      if (userId !== socket.id) {
        io.to(userId).emit("receive-offer", offer);
      }
    });
  });

  // 사용자가 answer를 보낼 때 처리
  socket.on("send-answer", (answer, roomId) => {
    const users = Array.from(rooms[roomId]);
    users.forEach(userId => {
      if (userId !== socket.id) {
        io.to(userId).emit("receive-answer", answer);
      }
    });
  });

  // ICE candidate를 보내는 부분
  socket.on("send-ice-candidate", (candidate, roomId) => {
    const users = Array.from(rooms[roomId]);
    users.forEach(userId => {
      if (userId !== socket.id) {
        io.to(userId).emit("receive-ice-candidate", candidate);
      }
    });
  });

  // 사용자가 연결을 끊을 때 처리
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // 방에서 해당 사용자를 제거
    for (const roomId in rooms) {
      if (rooms[roomId].has(socket.id)) {
        rooms[roomId].delete(socket.id);

        // 방에 더 이상 사용자가 없다면 방을 삭제
        if (rooms[roomId].size === 0) {
          delete rooms[roomId];
          console.log(`Room ${roomId} deleted`);
        }
        break;
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
