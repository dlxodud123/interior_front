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
    
    // 대기중인 사용자 리스트에 해당 사용자 socket id 추가
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
      io.to(user1).emit("join-room", roomId, true);
      io.to(user2).emit("join-room", roomId, false);

      console.log(`Room ${roomId} created with users: ${user1}, ${user2}`);

      // 대기열 초기화
      waitingQueue = [];
    }
  });

  // 사용자가 send-offer를 보낼 때 처리 (offer = 제안 데이터, roomId = 방 번호)
  socket.on("send-offer", (offer, roomId) => {
    const users = rooms[roomId];
    console.log("서버에서 offer 프론트한테 보내려함")

    if (!users) {
      console.error(`Room ${roomId} does not exist. (send-offer)`);
      return; // 방이 존재하지 않으면 처리하지 않음
    }

    const [user1, user2] = Array.from(users);
    if (user1 === socket.id) {
      console.log("서버에서 offer 프론트한테 보내려함");
      io.to(user2).emit("receive-offer", offer);
    } else {
      console.log("서버에서 offer 프론트한테 보내려함");
      io.to(user1).emit("receive-offer", offer);
    }
  });


  // 사용자가 send-answer를 보낼 때 처리
  socket.on("send-answer", (answer, roomId) => {
    const users = rooms[roomId];

    if (!users) {
        console.error(`Room ${roomId} does not exist. (send-answer)`);
        return; // 방이 존재하지 않으면 처리하지 않음
      }

    const [user1, user2] = Array.from(users);

    // socket.id가 user1이면 user2에게 answer을 보내고, 반대로 user2이면 user1에게 answer을 보냄
    if (socket.id === user1) {
      console.log("A가 B에게 answer을 보냄");
      io.to(user2).emit("receive-answer", answer);
    } else if (socket.id === user2) {
      console.log("B가 A에게 answer을 보냄");
      io.to(user1).emit("receive-answer", answer);
    }
  });


  // ICE send-ice-candidate를 보내는 부분
  socket.on("send-ice-candidate", (candidate, roomId) => {
    // const users = Array.from(rooms[roomId]);
    const users = rooms[roomId];

    if (!users) {
        console.error(`Room ${roomId} does not exist. (ice-candidate)`);
        return; // 방이 존재하지 않으면 처리하지 않음
    }

    users.forEach(userId => {
      if (userId !== socket.id) {
        // console.log("ice 후보 정보 받음 : ", candidate, "ice 후보 정보 user : ", userId);
        // 해당 방에 속한 다른 사용자에게 ICE 후보를 전송
        io.to(userId).emit("receive-ice-candidate", candidate);
      }
    });
  });




  socket.on("exit-room", (roomId) => {
    console.log(`User ${socket.id} is exiting room ${roomId}`);
  
    if (rooms[roomId]?.has(socket.id)) {
      rooms[roomId].delete(socket.id);
  
      // 방에 남은 사용자에게 알림
      rooms[roomId].forEach((userId) => {
        io.to(userId).emit("room-disconnected", "The other user has left the room.");
      });
  
      // 방이 비어있으면 삭제
      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} deleted.`);
      }
    }
  });

  // 사용자가 연결을 끊을 때 처리
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  
    // 사용자가 속한 방을 찾기
    for (const roomId in rooms) {
      if (rooms[roomId].has(socket.id)) {
        rooms[roomId].delete(socket.id);
  
        // 남은 사용자에게 알림
        rooms[roomId].forEach((userId) => {
          io.to(userId).emit("room-disconnected", "The other user has disconnected.");
        });
  
        // 방이 비어있으면 삭제
        if (rooms[roomId].size === 0) {
          delete rooms[roomId];
          console.log(`Room ${roomId} deleted.`);
        }
        break;
      }
    }
  });
});

server.listen(20000, () => {
  console.log("Server is running on http://localhost:20000");
});