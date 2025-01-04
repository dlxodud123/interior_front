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
    let [emailAuthenticationPart, setEmailAuthenticationPart] = useState(false);

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };

    let [emailAuthenticationData, setEmailAuthenticationData] = useState(null); // 데이터를 저장할 상태
    let [emailAuthenticationLoading, setEmailAuthenticationLoading] = useState(null); // 로딩 상태 
    let [emailAuthenticationError, setEmailAuthenticationError] = useState(null); // 에러 상태

    const fetchEmailAuthentication = async () => {
        // alert("이메일 인증이 완료되었습니다. 코드를 입력해주세요.");
        // console.log("이메일 : ", emailValue);
        
        setEmailAuthenticationLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${api}/register/email/verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                })
            });
            
            // status 확인
            console.log("status Code : ", response.status); // 200 or 401
            console.log("Status Text:", response.statusText);
            
            if (response.status === 200) {
                // 성공적인 요청인 경우 (status 200)
                alert("이메일 인증이 완료되었습니다. 코드를 입력해주세요.");
                // const result = await response.json();
                // setEmailAuthenticationData(result);
                setEmailAuthenticationPart(true);
            } else if (response.status === 401) {
                // 인증 실패 등의 상황 (status 401)
                setEmailAuthenticationError("인증에 실패했습니다. 이메일을 확인하세요.");
                alert(emailAuthenticationError);
            } else {
                // 그 외의 에러
                try {
                    throw new Error(`Error: ${response.status} : ${response.statusText}`);
                } catch (error) {
                    alert(error.message);
                }
            }
            
        } catch (error) {
            setEmailAuthenticationError(error.message);
        } finally {
            setEmailAuthenticationLoading(false); // 로딩 종료
        }

    };


    // 코드 인증
    let [codeValue, setCodeValue] = useState('');
    let [codeAuthenticationPart, setCodeAuthenticationPart] = useState(false);
    
    const handleCodeChange = (e) => {
        setCodeValue(e.target.value);
    };

    let [codeAuthenticationData, setCodeAuthenticationData] = useState(null); // 데이터를 저장할 상태
    let [codeAuthenticationLoading, setCodeAuthenticationLoading] = useState(null); // 로딩 상태 
    let [codeAuthenticationError, setCodeAuthenticationError] = useState(null); // 에러 상태

    const fetchCodeAuthentication = async () => {
        // alert("코드 인증이 완료되었습니다.");
        // console.log("코드 : ", codeValue);
        setCodeAuthenticationPart(true);
        setCodeAuthenticationLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${api}/register/email/check/verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    verificationCode: codeValue,
                })
            });
            
            // status 확인
            console.log("status Code : ", response.status); // 200 or 401
            console.log("Status Text:", response.statusText);
            
            if (response.status === 200) {
                // 성공적인 요청인 경우 (status 200)
                alert("코드 인증이 완료되었습니다.");
                setEmailAuthenticationPart(true);
                // const result = await response.json();
                // setCodeAuthenticationData(result);
            } else if (response.status === 401) {
                // 인증 실패 등의 상황 (status 401)
                setCodeAuthenticationError("인증에 실패했습니다. 코드번호를 확인하세요.");
                alert(emailAuthenticationError);
            } else {
                // 그 외의 에러
                try {
                    throw new Error(`Error: ${response.status} : ${response.statusText}`);
                } catch (error) {
                    alert(error.message);
                }
            }
            
        } catch (error) {
            setCodeAuthenticationError(error.message);
        } finally {
            setCodeAuthenticationLoading(false); // 로딩 종료
        }
    };


    // 유저네임 중복 체크
    let [usernameValue, setUsernameValue] = useState('');
    let [usernameDuplicationPart, setUsernameDuplicationPart] = useState(false)
 
    const handleUsernameChange = (e) => {
        setUsernameValue(e.target.value);
    };

    let [usernameDuplicationData, setUsernameDuplicationData] = useState(null); // 데이터를 저장할 상태
    let [usernameDuplicationLoading, setUsernameDuplicationLoading] = useState(null); // 로딩 상태 
    let [usernameDuplicationError, setUsernameDuplicationError] = useState(null); // 에러 상태

    const fetchUsernameDuplication = async () => {
        // alert("사용 가능한 유저네임 입니다.");
        // console.log("유저네임 : ", usernameValue);
        setUsernameDuplicationPart(true);

        setUsernameDuplicationLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${api}/register/nickname/${usernameValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // status 확인
            console.log("status Code : ", response.status); // 200 or 409
            console.log("Status Text:", response.statusText); // 사용 가능한 닉네임입니다. or 사용중인 닉네임입니다.

            if (response.status === 200) {
                // 성공적인 요청인 경우 (status 200)
                alert("사용 가능한 유저네임 입니다."); 
                const result = await response.json();
                setUsernameDuplicationData(result); // 성공시
            } else if (response.status === 409) {
                // 인증 실패 등의 상황 (status 409)
                setUsernameDuplicationError("유저네임이 중복되었습니다.");
                alert(usernameDuplicationError);
            } else {
                // 그 외의 에러
                try {
                    throw new Error(`Error: ${response.status} : ${response.statusText}`);
                } catch (error) {
                    alert(error.message);
                }
            }
            
        } catch (error) {
            setUsernameDuplicationError(error.message);
        } finally {
            setUsernameDuplicationLoading(false); // 로딩 종료
        }

    };

    // 각 부분 통과 확인
    useEffect(() => {
        if (emailAuthenticationPart) {
            console.log("이메일 인증 부분 통과");
        }
        if (codeAuthenticationPart) {
            console.log("코드 인증 부분 통과");
        }
        if (usernameDuplicationPart) {
            console.log("유저네임 중복 부분 통과");
        }
    }, [emailAuthenticationPart, codeAuthenticationPart, usernameDuplicationPart]);


    // 패스워드 확인
    let [passwordValue, setPasswordValue] = useState('');

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    
    // 회원가입 버튼 활성화
    let [SignupBtn, setSignupBtn] = useState(false);

    useEffect(() => {
        if(codeAuthenticationPart && usernameDuplicationPart && (passwordValue.length >= 8)){
            setSignupBtn(true);
        }else{
            setSignupBtn(false);
        }
    }, [codeAuthenticationPart, usernameDuplicationPart, passwordValue, SignupBtn]);



    // 최종 회원가입
    // let [signupData, setSignupData] = useState(null); // 데이터를 저장할 상태
    let [signupLoading, setSignupLoading] = useState(null); // 로딩 상태 
    let [signupError, setSignupError] = useState(null); // 에러 상태

    const fetchSignup = async () => {
        // alert("회원가입이 완료되었습니다!");
        console.log("이메일 : ", emailValue);
        console.log("닉네임 : ", usernameValue);
        console.log("비밀번호 : ", passwordValue);
        // navigate("/");

        setSignupLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${api}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password : passwordValue,
                    nickname : usernameValue,
                    gender: "male",
                })
            });

            // status 확인
            console.log("status Code : ", response.status); // 200 or 409
            console.log("Status Text:", response.statusText); // register success or already registered email

            if (response.status === 200) {
                // 성공적인 요청인 경우 (status 200)
                // const result = await response.json();
                // setSignupData(result); // 성공시 
                alert("회원가입이 완료되었습니다!");
                navigate("/");
            } else if (response.status === 409) {
                // 인증 실패 등의 상황 (status 409)
                setSignupError("이미 가입되어있는 회원 입니다.");
            } else {
                // 그 외의 에러
                throw new Error(`Error: ${response.status} : ${response.statusText}`);
            }
            
        } catch (error) {
            setSignupError(error.message);
        } finally {
            setSignupLoading(false); // 로딩 종료
        }

    }

    return(
        <body className='signup_container'>
            <div className='signup_content'>
                <div className='signup_input-email_container'>
                    {
                        emailAuthenticationPart ? 
                        <div className='media_signup_input_email_container'>
                            <input readOnly className='signup_input-email_hold_content' placeholder='Email' value={emailValue} style={{outline:"none", cursor:"default"}}></input>
                            {
                                codeAuthenticationPart ? 
                                <input readOnly className='signup_input_verification_code_content' placeholder='Verification Code' onChange={handleCodeChange} style={{outline:"none", cursor:"default"}}></input>
                                :
                                <input className='signup_input_verification_code_content' placeholder='Verification Code' onChange={handleCodeChange}></input>
                            }
                            {
                                codeValue.length >= 1 ?
                                codeAuthenticationPart ? 
                                <button className='signup_verification_code_btn' style={{cursor:"default"}}>Success</button>
                                :
                                <button onClick={() => fetchCodeAuthentication()} className='signup_verification_code_btn'>Code Authentication</button>
                                :
                                <button className='signup_verification_code_none_btn'>Code Authentication</button>
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
                        {/* {
                            usernameDuplicationPart ? 
                            <input readOnly className='signup_input-username_content' maxLength={8} placeholder='Username (min 3 characters & max 8 characters)' onChange={handleUsernameChange}></input>
                            :
                            <input className='signup_input-username_content' maxLength={8} placeholder='Username (min 3 characters & max 8 characters)' onChange={handleUsernameChange}></input>
                        } */}
                        <input className='signup_input-username_content' maxLength={8} placeholder='Username (min 3 characters & max 8 characters)' onChange={handleUsernameChange}></input>
                        {
                            usernameValue.length >= 3 ? 
                            usernameDuplicationPart ? 
                            <button onClick={() => fetchUsernameDuplication()} className='signup_username_duplication_btn'>Duplication Check</button>
                            :
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