import './../css/randomchat_info.css';
import { useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import { MyContext } from '../../App';
import { IoMdPerson } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Randomchat_info = () => {
    const { api } = useContext(MyContext);
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트 상태
    const [input, setInput] = useState(''); // 메시지 입력 상태
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [nickname, setNickname] = useState(''); // 닉네임 상태
    const [roomId, setRoomId] = useState(null); // 구독할 채널 번호 상태

    // STOMP 클라이언트 초기화
    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/chat', // STOMP 서버 WebSocket URL
            reconnectDelay: 5000, // 재연결 간격
            debug: (str) => console.log(str), // 디버그 로그
        });

        client.onConnect = () => console.log("STOMP connected");
        client.onStompError = (error) => console.error("STOMP error:", error);

        client.activate(); // 연결 시작
        setStompClient(client);

        return () => client.deactivate(); // 컴포넌트 언마운트 시 연결 종료
    }, []);

    // 닉네임 설정 후 채팅방 연결
    const handleConnect = () => {
        if (nickname.trim()) {
            fetch('http://localhost:8080/chat/enterChatRoom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname }), // 닉네임 전송
            })
                .then((response) => response.json())
                .then((data) => {
                    setRoomId(data.roomId); // 응답값에서 채널 번호 추출
                    subscribeToRoom(data.roomId); // 채널 구독
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    // 채널 구독
    const subscribeToRoom = (roomId) => {
        if (stompClient) {
            stompClient.subscribe(`/room/${roomId}`, (message) => {
                const msg = JSON.parse(message.body); // 서버로부터 메시지 수신
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'other', content: msg.content }, // 메시지 목록 업데이트
                ]);
            });
            console.log(`Subscribed to room ${roomId}`);
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (input.trim() && stompClient && roomId) {
            const message = { content: input };
            stompClient.publish({
                destination: `/send/${roomId}`, // 메시지 전송 경로
                body: JSON.stringify(message),
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'me', content: input },
            ]); // 내가 보낸 메시지 추가
            setInput('');
        }
    };

    // 디버그용 메시지 로그
    useEffect(() => {
        console.log("Messages:", messages);
    }, [messages]);

    return (
        <div className='randomchat_info_container'>
            {!roomId ? (
                <div className='randomchat_waiting_screen'>
                    <input
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={handleConnect}>연결</button>
                </div>
            ) : (
                <>
                    <div className='randomchat_info_title_content'>
                        <div className='randomchat_info_title_icon_content'>
                            <IoMdPerson className='randomchat_info_title_icon'></IoMdPerson>
                        </div>
                        <div className='randomchat_info_title_text'>채팅방</div>
                        <div className='randomchat_info_title_search'>
                            <FiSearch />
                        </div>
                    </div>
                    <div className='randomchat_info_content'>
                        {messages.length === 0 ? (
                            <div className='randomchat_info_none_content'>대화 내용이 없습니다.</div>
                        ) : (
                            <div className='randomchat_info_text_container'>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={
                                            msg.sender === 'me'
                                                ? 'randomchat_info_text_me'
                                                : 'randomchat_info_text_other'
                                        }
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='randomchat_info_input_content'>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            className='randomchat_info_input'
                        />
                        <div onClick={sendMessage} className='randomchat_info_input_btn'>
                            Send
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Randomchat_info;
