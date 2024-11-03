import './../css/signup_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup_info = () => {
    const { api } = useContext(MyContext);

    const navigate = useNavigate();

    // 이메일 인증
    let [emailValue, setEmailValue] = useState('');
    let [emailAuthenticationBtn, setEmailAuthenticationBtn] = useState(false);

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };

    const fetchEmailAuthentication = async () => {

        console.log("이메일 : ", emailValue);

        setEmailAuthenticationBtn(true);

    };

    // 코드 인증
    let [codeValue, setCodeValue] = useState('');
    let [codeAuthenticationBtn, setCodeAuthenticationBtn] = useState(false);
    
    const handleCodeChange = (e) => {
        setCodeValue(e.target.value);
    };

    const fetchCodeAuthentication = async () => {

        console.log("코드 : ", codeValue);

        setCodeAuthenticationBtn(true);

    };

    // 유저네임 중복 체크
    let [usernameValue, setUsernameValue] = useState('');
    let [usernameDuplicationBtn, setUsernameDuplicationBtn] = useState(false)
 
    const handleUsernameChange = (e) => {
        setUsernameValue(e.target.value);
    };

    const fetchUsernameDuplication = async () => {

        console.log("유저네임 : ", usernameValue);

        setUsernameDuplicationBtn(true);

    };

    // 버튼들 확인
    useEffect(() => {
        if (emailAuthenticationBtn) {
            console.log("이메일 인증 버튼 활성화");
        }
        if (codeAuthenticationBtn) {
            console.log("코드 인증 버튼 활성화");
        }
        if (usernameDuplicationBtn) {
            console.log("유저네임 중복 버튼 활성화");
        }
    }, [emailAuthenticationBtn, codeAuthenticationBtn, usernameDuplicationBtn]);


    // 패스워드 확인
    let [passwordValue, setPasswordValue] = useState('');

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    
    // 회원가입 버튼 활성화
    let [SignupBtn, setSignupBtn] = useState(false);

    useEffect(() => {
        if(codeAuthenticationBtn && usernameDuplicationBtn && (passwordValue.length >= 8)){
            setSignupBtn(true);
        }else{
            setSignupBtn(false);
        }
    }, [codeAuthenticationBtn, usernameDuplicationBtn, passwordValue, SignupBtn]);


    // 최종 회원가입
    const fetchSignup = async () => {
        console.log("비밀번호 : ", passwordValue);
        console.log("최종 회원가입");

    }

    // let [data, setData] = useState(null); // 데이터를 저장할 상태
    // let [loading, setLoading] = useState(true); // 로딩 상태
    // let [error, setError] = useState(null); // 에러 상태

    // const fetchData = async () => {
    //     console.log("최종 이메일 : ", );
    //     console.log("최종 닉네임 : ", );
    //     console.log("최종 비밀번호 : ", );

    //     setLoading(true); // 로딩 시작
    //     try {
    //         const response = await fetch('http://localhost:8080/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email : "user@gmail.com",
    //                 password : "password",
    //                 nickname : "nickname",
    //             })
    //         });

    //         // status 확인
    //         console.log("status 확인 : ", response.status);

    //         if (response.status === 200) {
    //             // 성공적인 요청인 경우 (status 200)
    //             const result = await response.json();
    //             setData(result);
    //         } else if (response.status === 401) {
    //             // 인증 실패 등의 상황 (status 401)
    //             setError("인증에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
    //         } else {
    //             // 그 외의 에러
    //             throw new Error(`Error: ${response.status}`);
    //         }
            
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false); // 로딩 종료
    //     }
    // };
    // useEffect(() => {

    // }, []);


    return(
        <body className='signup_container'>
            <div className='signup_content'>
                <div className='signup_input-email_container'>
                    {
                        emailAuthenticationBtn ? 
                        <div className='media_signup_input_email_container'>
                            <input readOnly className='signup_input-email_hold_content' placeholder='Email' value={emailValue}></input>
                            <input className='signup_input_verification_code_content' placeholder='Verification Code' onChange={handleCodeChange}></input>
                            {
                                codeValue.length >= 1 ?
                                <button onClick={() => fetchCodeAuthentication()} className='signup_verification_code_btn'> Code Authentication</button>
                                :
                                <button className='signup_verification_code_none_btn'> Code Authentication</button>
                            }
                        </div>
                        :
                        <div className='media_signup_input_email_container'>
                            <input className='signup_input-email_content' placeholder='Email' onChange={handleEmailChange}></input>
                            {
                                emailValue.length >= 1 ?
                                <button onClick={() => fetchEmailAuthentication()} className='signup_email_authentication_btn'>Email Authentication</button>
                                :
                                <button className='signup_email_authentication_none_btn'>Email Authentication</button>
                            }
                        </div>
                    }
                </div>  

                <div className='signup_input-username_container'>
                    <div className='media_signup_input-username_container'>
                        <input className='signup_input-username_content' maxLength={8} placeholder='Username (min 3 characters & max 8 characters)' onChange={handleUsernameChange}></input>
                        {usernameValue.length >= 3 ? 
                            <button onClick={() => fetchUsernameDuplication()} className='signup_username_duplication_btn'>Duplication Check</button>
                            :
                            <button className='signup_username_duplication_none_btn'>Duplication Check</button>
                        }
                    </div>
                </div>  

                <div className='signup_input-password_container'>
                    <input className='signup_input-password_content' placeholder='Password (min 8 characters)' onChange={handlePasswordChange}></input>
                </div> 

                <div className='signup_btn_container'>
                    {
                        SignupBtn ? 
                        <button onClick={() => fetchSignup()} className='signup_btn'>
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