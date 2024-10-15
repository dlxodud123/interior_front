import './../css/signup_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup_info = () => {
    const { api } = useContext(MyContext);

    const navigate = useNavigate();

    let [emailAuthenticationBtn, setEmailAuthenticationBtn] = useState(false);
    
    let [emailContent, setEmailContent] = useState('');
    let [emailContentLength, setEmailContentLength] = useState(0);
    let [usernameContent, setUsernameContent] = useState('');
    let [usernameContentLength, setUsernameContentLength] = useState(0);
    let [passwordContent, setPasswordContent] = useState('');
    let [passwordContentLength, setPasswordContentLength] = useState(0);
    let [code, setCode] = useState('');
    let [codeLength, setCodeLength] = useState(0);

    const handleEmailChange = (e) => {
        setEmailContent(e.target.value);
        setEmailContentLength(e.target.value.length);
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value);
        setCodeLength(e.target.value.length);
    }
    const handleUsernameChange = (e) => {
        setUsernameContent(e.target.value);
        setUsernameContentLength(e.target.value.length);
    };
    const handlePasswordChange = (e) => {
        setPasswordContent(e.target.value);
        setPasswordContentLength(e.target.value.length);
    };

    let [finalEmailBtn, setFinalEmailBtn] = useState(false);
    // let [finalUsernamBtn, setFinalUsernameBtn] = useState(false);
    let [finalPassword, setFinalPassword] = useState(false);
    let [finalSignupBtn, setFinalSignupBtn] = useState(false);

    /* 비밀번호 길이 체크 */
    useEffect(() => {
        if (passwordContentLength >= 8) {
            setFinalPassword(true);
        }else{
            setFinalPassword(false);
        }
    }, [passwordContentLength, finalPassword])

    /* 최종 회원가입 */
    useEffect(() => {
        if(finalEmailBtn && finalPassword ){
            setFinalSignupBtn(true);
        }else{
            setFinalSignupBtn(false);
        }
    }, [finalEmailBtn, finalPassword, finalSignupBtn])

    /* 테스트용 */
    useEffect(() => {
        console.log("이메일 : ", emailContent);
        console.log("코드 : ", code);
        console.log("코드 길이 : ", codeLength);
        console.log("유저네임 : ", usernameContent);
        console.log("유저네임 길이 : ", usernameContentLength);
        console.log("비밀번호 : ", passwordContent);
        console.log("비밀번호 길이 : ", passwordContentLength)
    }, [emailContent, code, usernameContent, passwordContent]);

    return(
        <body className='signup_container'>
            <div className='signup_content'>
                <div className='signup_input-email_container'>
                    {
                        emailAuthenticationBtn ? 
                        <div className='media_signup_input_email_container'>
                            <input readOnly className='signup_input-email_hold_content' placeholder='Email' value={emailContent} onChange={handleEmailChange}></input>
                            <input className='signup_input_verification_code_content' placeholder='Verification Code' value={code} onChange={handleCodeChange}></input>
                            {
                                codeLength >= 1 ?
                                <button onClick={() => setFinalEmailBtn(true)} className='signup_verification_code_btn'> Code Authentication</button>
                                :
                                <button className='signup_verification_code_none_btn'> Code Authentication</button>
                            }
                        </div>
                        :
                        <div className='media_signup_input_email_container'>
                            <input className='signup_input-email_content' placeholder='Email' value={emailContent} onChange={handleEmailChange}></input>
                            {
                                emailContentLength >= 1 ?
                                <button onClick={() => setEmailAuthenticationBtn(true)} className='signup_email_authentication_btn'>Email Authentication</button>
                                :
                                <button className='signup_email_authentication_none_btn'>Email Authentication</button>
                            }
                        </div>
                    }
                </div>  

                <div className='signup_input-username_container'>
                    <div className='media_signup_input-username_container'>
                        <input className='signup_input-username_content' maxLength={8} placeholder='Username (min 3 characters & max 8 characters)' value={usernameContent} onChange={handleUsernameChange}></input>
                        {/* {usernameContentLength >= 3 ? 
                            <button onClick={() => setFinalUsernameBtn(true)} className='signup_username_duplication_btn'>Duplication Check</button>
                            :
                            <button className='signup_username_duplication_none_btn'>Duplication Check</button>
                        } */}
                    </div>
                </div>  

                <div className='signup_input-password_container'>
                    <input className='signup_input-password_content' placeholder='Password (min 8 characters)' value={passwordContent} onChange={handlePasswordChange}></input>
                </div> 

                <div className='signup_btn_container'>
                    {
                        finalSignupBtn ? 
                        <button className='signup_btn'>
                            Sign up
                        </button>
                        :
                        <button className='signup_none_btn'>
                            Sign up
                        </button>
                    }
                </div>
            </div>
        </body>
    )
}

export default Signup_info;