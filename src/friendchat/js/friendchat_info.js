import { useNavigate } from 'react-router-dom';
import './../css/friendchat_info.css';
import { useEffect, useRef } from 'react';

const Friendchat_info = () => {

    const navigate = useNavigate();
    const hasAlerted = useRef(false);

    useEffect(() => {
        if (!hasAlerted.current && !localStorage.getItem('userToken')) {
            hasAlerted.current = true;
            alert("로그인 후 이용해주세요.");
            navigate('/login')
        }
    }, [])

    return(
        <div className='friendchat_info_container'>
            <div className='friendchat_info_list_container'>
                asdf
            </div>
            <div className='friendchat_info_msg_container'>
                zxcv
            </div>
        </div>
    )
}

export default Friendchat_info;