import './../css/header.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const { api, googleLogin, setGoogleLogin, kakaoLogin, setKakaoLogin, siteLogin, setSiteLogin } = useContext(MyContext);
    const location = useLocation();
    const initialCategory  =  location.state?.categoryBtn || "default";

    let [categoryBtn, setCategoryBtn] = useState(initialCategory);
    let [myBtn, setMyBtn] = useState(false);
    let [mainBtn, setMainBtn] = useState(false);
    let [loginBtn, setLoginBtn] = useState(false);
    let [signupBtn, setSignupBtn] = useState(false);

    const handelLogout = () => {
        if (googleLogin) {
            setGoogleLogin(false);
            localStorage.removeItem('userToken')
        }else if (kakaoLogin) {
            setKakaoLogin(false);
            localStorage.removeItem('userToken')
        }else if (siteLogin) {
            setSiteLogin(false);
            localStorage.removeItem('userToken')
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
    }, [myBtn, loginBtn, signupBtn, mainBtn, navigate])

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
                        googleLogin || kakaoLogin || siteLogin ?
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
                        googleLogin || kakaoLogin || siteLogin ? 
                        <>
                            <div onClick={() => handelLogout()} className='login-signup_btn' >
                                Logout
                            </div>
                            <div className='header_chat_gap'></div>
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