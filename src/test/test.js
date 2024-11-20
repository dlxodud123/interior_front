// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // 로컬 서버와 연결
// const socket = io('http://localhost:8080');

// const Test = () => {
//   const [message, setMessage] = useState(''); // 서버에서 받은 메시지를 저장할 상태

//   useEffect(() => {
//     console.log("Asdf")
//     // 서버 연결 성공 시
//     socket.on('connect', () => {
//       console.log('Connected to server:', socket.id);
//     });

//     // 서버에서 보낸 메시지 받기
//     socket.on('message', (data) => {
//       console.log('Message from server:', data); // 서버로부터 받은 메시지 출력
//       setMessage(data); // 받은 메시지를 상태에 저장
//     });

//     // 컴포넌트가 언마운트되면 소켓 연결 종료
//     return () => {
//       socket.off('connect');
//       socket.off('message');
//       socket.disconnect();
//     };
//   }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행

//   // 메시지 보내기
//   const sendMessage = () => {
//     socket.emit('sendMessage', 'Hello, server!');
//   };

//   return (
//     <div>
//       <button onClick={sendMessage}>Send Message</button>
//       {/* 서버에서 받은 메시지를 출력 */}
//       <p>{message}</p> 
//     </div>
//   );
// };

// export default Test;
