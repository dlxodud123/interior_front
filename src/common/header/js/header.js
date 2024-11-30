import './../css/header.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { RiSettings4Fill } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const { api, googleLogin, setGoogleLogin, kakaoLogin, setKakaoLogin } = useContext(MyContext);
    const location = useLocation();
    const initialCategory  =  location.state?.categoryBtn || "default";

    let [categoryBtn, setCategoryBtn] = useState(initialCategory);
    let [myBtn, setMyBtn] = useState(false);
    let [mainBtn, setMainBtn] = useState(false);
    let [loginBtn, setLoginBtn] = useState(false);
    let [signupBtn, setSignupBtn] = useState(false);
    let [chatBtn, setChatBtn] = useState(false);

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
        if(myBtn){
            navigate("/my");
            setMyBtn(false);
        }
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
        if(chatBtn) {
            navigate("/test");
            setChatBtn(false)
        }
    }, [myBtn, loginBtn, signupBtn, mainBtn, chatBtn, navigate])

    const handleCategoryChange = (category) => {
        if (category === "chat") {
            setCategoryBtn(category);
            navigate(`/randomchat`, { state: { categoryBtn: category } }); // state에 선택한 카테고리 전달
        }else{
            setCategoryBtn(category);
            navigate(`/randomvideo`, { state: { categoryBtn: category } }); // state에 선택한 카테고리 전달
        }
    };

    return(
        <header className='header_content'>
            <div className='header_top'>
                <div className='header_my'>
                    {
                        googleLogin || kakaoLogin ? 
                        <div className='header_my_container'>
                            <FaUserCircle onClick={() => setMyBtn(true)} className='header_my_content'/>
                        </div>
                        :
                        <>
                        </>
                    }
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
                            {/* <div className='header_chat_content'></div> */}
                            {/* <BsChatDotsFill onClick={() => setChatBtn(true)} className='header_chat'/> */}
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
                            {/* <div className='header_chat_content'></div> */}
                        </>
                    }
                </div>
            </div>
            <div className='header_bottom'>
                <div onClick={() => handleCategoryChange("chat")}
                    className={`default-btn ${categoryBtn === "chat" ? "check-btn" : "none-check-btn"}`}>
                        Random Chat
                </div>
                <div className='header_random_gap'></div>
                <div onClick={() => handleCategoryChange ("video")}
                    className={`default-btn ${categoryBtn === "video" ? "check-btn" : "none-check-btn"}`}>
                        Random Video
                </div>
            </div>
        </header>
    )
}

export default Header;