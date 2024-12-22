// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // 로컬 서버와 연결
// const socket = io('http://localhost:8080');

// const Test = () => {
//   const [input, setInput] = useState('');  // 사용자가 입력한 메시지를 저장할 상태
//   const [messages, setMessages] = useState([]);  // 메시지 목록

//   useEffect(() => {
//     // 서버 연결 성공 시
//     socket.on('connect', () => {
//       console.log('Connected to server:', socket.id);
//     });

//     // 서버에서 보낸 메시지 받기
//     socket.on('message', (data) => {
//       console.log('Message from server:', data);
//       setMessages((prevMessages) => [...prevMessages, data]);  // 받은 메시지를 상태에 추가
//     });

//     // 컴포넌트가 언마운트되면 소켓 연결 종료
//     return () => {
//       socket.off('connect');
//       socket.off('message');
//     };
//   }, []);

//   // 메시지 보내기
//   const sendMessage = () => {
//     if (input.trim()) {
//       // socket.emit('sendMessage', input);  // 서버로 메시지 전송
//       socket.emit('sendMessage', { sender: socket.id, content: input });
//       setInput('');  // 입력란 초기화
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}  // 입력값 상태 업데이트
//         />
//         <button onClick={sendMessage}>Send Message</button>
//       </div>
//       <div>
//         {/* 서버에서 받은 메시지를 출력 */}
//         {messages.map((msg, index) => (
//           <p key={index}>
//             {msg.sender === socket.id ? 'You: ' : 'Other: '}
//             {msg.content}
//         </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;
