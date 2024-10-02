import './../css/header.css';
import { RiSettings4Fill } from "react-icons/ri";
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    
    let [categoryBtn, setCategoryBtn] = useState("chat");
    let [loginBtn, setLoginBtn] = useState(false);
    let [signupBtn, setSignupBtn] = useState(false);
    let [mainBtn, setMainBtn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if(loginBtn) {
            navigate("/login");
        }
        else if(signupBtn) {
            navigate("/signup");
        }
        else if(mainBtn) {
            navigate("/");
        }
    }, [loginBtn, signupBtn, mainBtn])

    return(
        <header className='header_content'>
            <div className='header_top'>
                <div className='header_setting'>
                    <div className='header_setting_container'>
                        <RiSettings4Fill className='header_setting_content'/>
                    </div>
                </div>
                <div className='header_title'>
                    <label onClick={() => setMainBtn(true)} style={{cursor:"pointer"}}>Random Chat & Random Video</label>
                </div>
                <div className='header_login-signup_content'>
                    <div onClick={() => setLoginBtn(true)} className='login-signup_btn' >
                        Login
                    </div>
                    <div className='header_join_gap'></div>
                    <div onClick={() => setSignupBtn(true)} className='login-signup_btn' >
                        SignUp
                    </div>
                    <div className='header_friend_gap'></div>
                    <div className='header_friend_content'>
                        <MdPeople className='header_friend'/>
                    </div>
                </div>
            </div>
            <div className='header_bottom'>
                <div onClick={() => setCategoryBtn("chat")} 
                    className={`default-btn ${categoryBtn === "chat" ? "check-btn" : "none-check-btn"}`}>
                        Random Chat
                </div>
                <div className='header_random_gap'></div>
                <div onClick={() => setCategoryBtn("video")} 
                    className={`default-btn ${categoryBtn === "video" ? "check-btn" : "none-check-btn"}`}>
                        Random Video
                </div>
            </div>
        </header>
    )
}

export default Header;