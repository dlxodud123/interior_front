import './../css/randomchat_info.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs'; // STOMP 클라이언트
import { MyContext } from '../../App';

const Randomchat_info = () => {

    const { api } = useContext(MyContext);
    const { socket } = useContext(MyContext);
    const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트 상태
    const [input, setInput] = useState(''); // 메시지 입력 상태
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [nickname, setNickname] = useState(''); // 닉네임 상태
    const [roomId, setRoomId] = useState(null); // 구독할 채널 번호 상태
    const [isComposing, setIsComposing] = useState(false); // IME 조합 상태 관리
    const [socketDisconnect, setSocketDisconnect] = useState(false); // socket 연결 상태

    // STOMP 클라이언트 초기화
    useEffect(() => {
        const client = new Client({
            brokerURL: `${socket}/chat`, // STOMP 서버 WebSocket URL
            reconnectDelay: 5000, // 재연결 간격
            debug: (str) => console.log(str), // 디버그 로그
        });

        // STOMP 연결 성공
        client.onConnect = () => console.log("STOMP connected");

        // STOMP 연결 종료
        client.onDisconnect = () => console.log("STOMP 연결이 종료되었습니다.");

        // STOMP 오류 처리
        client.onStompError = (error) => console.error("STOMP error:", error);

        // WebSocket 연결 종료 처리
        client.onWebSocketClose = () => {
            console.log("소켓 연결이 끊겼습니다.");
            setSocketDisconnect(true);
        };

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

                console.log("msg 내용입니다 >>>>> ", msg);

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
        // console.log("메세지 내용 >>>>> " , msg);
        if(msg.type === "waiting" || msg.type === "matched" || msg.type === "leaved" || msg.type === "disconnect") return 'randomchat_info_text_alert';
        else if(msg.sender === nickname) return 'randomchat_info_text_me';

        else return 'randomchat_info_text_other';
    }
    // 닉네임별 css 클래스네임 정의
    const getMessageNicknameClassName = (msg) => {
        if(msg.sender === nickname) return 'randomchat_info_text_me_nickname';
        else return 'randomchat_info_text_other_nickname';
    }


    // 메시지 최근 내용 ref
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); 
        }
    }, [messages]);


    // 소켓 연결 끊길시 or 상대방이 나갈시 메시지 출력
    useEffect(() => {
        const socketDisconnectMsg = {
            type: "disconnect",
            message: "Connection lost. Please try again.",
            sender: "",
        }

        if (socketDisconnect) {
            setMessages((prevMessages) => [...prevMessages, socketDisconnectMsg]);
            setSocketDisconnect(false);
        }
    }, [socketDisconnect, messages]);

    return (
        <div className='randomchat_info_container'>
            {!roomId ? (
                    <div className='randomchat_info_nickname_content'>
                        <input
                            className='randomchat_info_nickname_input'
                            type="text"
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <button className='randomchat_info_nickname_btn' onClick={handleConnect}>Connect</button>
                    </div>
            ) : (
                <>
                    <div className='randomchat_info_title_content'>
                        <div className='randomchat_info_title_text'>Chat Room</div>
                    </div>
                    <div className='randomchat_info_content'>
                        <div className='randomchat_info_text_container'>
                            {messages.map((msg, index) => (
                                <div>
                                    <div className={getMessageNicknameClassName(msg)}>{msg.sender}</div>
                                    <div
                                        key={index}
                                        className={getMessageClassName(msg)}
                                    >
                                        {
                                            msg.message === "상대방을 기다리는 중입니다." ? 
                                                "Waiting for the other person..."
                                            :
                                                msg.message === "매칭되었습니다." ?
                                                    "Matched!"
                                                :
                                                    msg.message === "상대방이 대화를 떠났습니다." ? 
                                                        "The other person has left the chat."
                                                    :
                                                        msg.message
                                        }
                                    </div>
                                    {
                                        (msg.message === "상대방이 대화를 떠났습니다." || msg.message === "Connection lost. Please try again.") &&
                                            <button onClick={() => window.location.reload()} className='randomchat_info_text_new'>Start New Chat</button>
                                    }
                                </div>
                            ))}
                            <div ref={messagesEndRef} /> 
                        </div>
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
