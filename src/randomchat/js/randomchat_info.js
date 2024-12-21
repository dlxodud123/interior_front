import './../css/randomchat_info.css';
import { useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import { MyContext } from '../../App';
import { IoMdPerson } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { GiSouthAfrica } from 'react-icons/gi';

const Randomchat_info = () => {
    const { api } = useContext(MyContext);
    const { socket } = useContext(MyContext);
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트 상태
    const [input, setInput] = useState(''); // 메시지 입력 상태
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [nickname, setNickname] = useState(''); // 닉네임 상태
    const [roomId, setRoomId] = useState(null); // 구독할 채널 번호 상태
    const [isComposing, setIsComposing] = useState(false); // IME 조합 상태 관리

    // STOMP 클라이언트 초기화
    useEffect(() => {
        const client = new Client({
            brokerURL: `${socket}/chat`, // STOMP 서버 WebSocket URL
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
            fetch(`${api}/enter/enterChatRoom`, {
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

                console.log("msg 내용입니다 >>>>> ", msg)

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: msg.type, sender: msg.sender, message: msg.message }, // 메시지 목록 업데이트
                ]);
            });
            console.log(`Subscribed to room ${roomId}`);
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (input.trim() && stompClient && roomId) {
            const message = { message: input };
            stompClient.publish({
                destination: `/send/${roomId}`, // 메시지 전송 경로
                body: JSON.stringify({"sender" : nickname, "message" : message.message}),
            });
            console.log("메세지 전송 완료!!! >>> " , message.message);
            setInput('');
        }
    };

    // 디버그용 메시지 로그
    useEffect(() => {
        console.log("Messages:", messages);
    }, [messages]);

    // 메세지별 css 클래스네임 정의
    const getMessageClassName = (msg) => {
        console.log("메세지 내용 >>>>> " , msg)
        if(msg.type !== undefined) return 'randomchat_info_text_alert';
        else if(msg.sender === nickname) return 'randomchat_info_text_me';
        else return 'randomchat_info_text_other';
    }

    return (
        <div className='randomchat_info_container'>
            {!roomId ? (
                <div className='randomchat_waiting_screen'>
                    <div className='randomchat_nickname_div'>
                        <input
                            className='randomchat_nickname_input_box'
                            type="text"
                            placeholder="닉네임을 입력하세요"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <button onClick={handleConnect}>연결</button>
                    </div>
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
                                        className={getMessageClassName(msg)}
                                    >
                                        {msg.message}
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
                            if (e.key === 'Enter' && !isComposing) { 
                                // IME 조합 중이 아닐 때만 실행
                                e.preventDefault();
                                if (input.trim()) {
                                    sendMessage();
                                }
                            }
                        }}
                        onCompositionStart={() => setIsComposing(true)} // IME 입력 시작
                        onCompositionEnd={() => setIsComposing(false)}  // IME 입력 완료
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
