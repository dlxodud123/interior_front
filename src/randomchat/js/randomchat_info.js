import './../css/randomchat_info.css';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MyContext } from '../../App';
import { IoMdPerson } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const Randomchat_info = () => {
    const { api } = useContext(MyContext);

    const [socket, setSocket] = useState(null); // 소켓 상태 관리
    const [input, setInput] = useState('');    // 사용자가 입력한 메시지
    const [messages, setMessages] = useState([]); // 메시지 목록
    const [mySocketId, setMySocketId] = useState(null); // 내 소켓 ID 저장

    useEffect(() => {
        const newSocket = io('http://localhost:8080');
        setSocket(newSocket);

        // 소켓 ID 저장
        newSocket.on('connect', () => {
            console.log('Connected:', newSocket.id);
            setMySocketId(newSocket.id);
        });

        // 서버로부터 상대방 메시지를 받아옴
        newSocket.on('message', (data) => {
            console.log('Message from server:', data);
            setMessages((prevMessages) => [...prevMessages, { sender: 'other', content: data.content }]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // 내가 입력한 메시지를 서버(상대방)에 보냄
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, { sender: 'me', content: input }]);
            socket.emit('sendMessage', { content: input });
            setInput('');
        }
    };

    // sender를 통해 누가 보낸지 구분, content를 통해 내용 확인
    useEffect(() => {
        console.log("메시지 정보 : ", messages);
    }, [messages])
    
    return(
        <div className='randomchat_info_container'>
            <div className='randomchat_info_title_content'>
                <div className='randomchat_info_title_icon_content'>
                    <IoMdPerson className='randomchat_info_title_icon'></IoMdPerson>
                </div>
                <div className='randomchat_info_title_text'>
                    이태영
                </div>
                <div className='randomchat_info_title_search'>
                    <FiSearch></FiSearch>
                </div>
            </div>
            <div className='randomchat_info_content'>
                {messages.length === 0 ? (
                    <div className='randomchat_info_none_content'>
                        대화 내용이 없습니다.
                    </div>
                    ) : (
                    <div className='randomchat_info_text_container'>
                        <div className='randomchat_info_other_icon_container'>
                            <div className='randomchat_info_other_icon_content'>
                                <IoMdPerson className='randomchat_info_other_icon'></IoMdPerson>
                            </div>
                        </div>
                        <div className='randomchat_info_text_content'>
                            {messages.map((msg, index) => (
                                <div className={msg.sender === "me" ? 'randomchat_info_text_me' : 'randomchat_info_text_oher'}>
                                    {msg.sender === 'me' ? 'You: ' : 'Other: '}
                                    {msg.content}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* <div className='randomchat_info_me_content'>
                    <div className='randomchat_info_me_text_content'>
                        fbghdfsfg
                    </div>
                </div> */}
            </div>
            <div className='randomchat_info_input_content'>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }} className='randomchat_info_input'></input>  
                <div onClick={sendMessage} className='randomchat_info_input_btn'>
                    Send
                </div>  
            </div>
        </div>
    )
}

export default Randomchat_info;