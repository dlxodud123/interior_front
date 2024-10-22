import './../css/header.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RiSettings4Fill } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const { api, googleLogin, setGoogleLogin, kakaoLogin, setKakaoLogin } = useContext(MyContext);

    let [categoryBtn, setCategoryBtn] = useState("default");
    let [myBtn, setMyBtn] = useState(false);
    let [mainBtn, setMainBtn] = useState(false);
    let [loginBtn, setLoginBtn] = useState(false);
    let [signupBtn, setSignupBtn] = useState(false);

    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setCategoryBtn("default");
    }, [mainBtn])

    useEffect(() => {
        console.log("구글 로그인 확인용: ", googleLogin);
        console.log("카카오톡 로그인 확인용: ", kakaoLogin);
    }, [googleLogin, kakaoLogin])

    const handelLogout = () => {
        if (googleLogin) {
            setGoogleLogin(false);
        }else if (kakaoLogin) {
            setKakaoLogin(false);
        }
        navigate('/');
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(loginBtn) {
            navigate("/login");
            setLoginBtn(false);
        }
        if(signupBtn) {
            navigate("/signup");
            setSignupBtn(false);
        }
        if(mainBtn) {
            navigate("/");
            setMainBtn(false);
        }
        if(myBtn){
            navigate("/my");
            setMyBtn(false);
        }
    }, [loginBtn, signupBtn, mainBtn, myBtn, navigate])

    return(
        <header className='header_content'>
            <div className='header_top'>
                <div className='header_my'>
                    <div className='header_my_container'>
                        <FaUserCircle onClick={() => setMyBtn(true)} className='header_my_content'/>
                    </div>
                </div>
                <div className='header_title'>
                    <label onClick={() => setMainBtn(true)} style={{cursor:"pointer"}}>Random Chat & Random Video</label>
                </div>
                <div className='header_login-signup_content'>
                    {
                        googleLogin || kakaoLogin ? 
                        <>
                            <div onClick={() => handelLogout()} className='login-signup_btn' >
                                Logout
                            </div>
                            <div className='header_chat_gap'></div>
                            <div className='header_chat_content'>
                                <BsChatDotsFill className='header_chat'/>
                            </div>
                        </>
                        :
                        <>
                            <div onClick={() => setLoginBtn(true)} className='login-signup_btn' >
                                Login
                            </div>
                            <div className='header_join_gap'></div>
                            <div onClick={() => setSignupBtn(true)} className='login-signup_btn' >
                                SignUp
                            </div>
                            <div className='header_chat_gap'></div>
                            <div className='header_chat_content'>
                                {/* <BsChatDotsFill className='header_chat'/> */}
                            </div>
                        </>
                    }
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