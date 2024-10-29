// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // 서버 URL

// const Test = () => {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]); // 채팅 메시지 목록 저장

//   useEffect(() => {
//     // 서버에서 메시지를 수신할 때마다 `chat` 상태에 추가
//     socket.on('receiveMessage', (msg) => {
//       setChat((prevChat) => [...prevChat, msg]); // 이전 메시지 배열에 새 메시지를 추가
//     });
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       // 서버에 메시지 전송
//       socket.emit('sendMessage', message);
//       // 전송한 메시지도 `chat` 상태에 추가
//       setChat((prevChat) => [...prevChat, message]);
//       setMessage(''); // 입력 필드를 초기화
//     }
//   };

//   return (
//     <div>
//       <div className="chat-window">
//         {chat.map((msg, index) => (
//           <p key={index}>{msg}</p> // 저장된 메시지를 화면에 표시
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="메시지를 입력하세요"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Test;
