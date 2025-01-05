import './../css/login_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { Children, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_info = () => {
    const { api, setKakaoLogin, setSiteLogin } = useContext(MyContext);

    let [signupBtn, setSignupBtn] = useState(false);
    let [loginBtn, setLoginBtn] = useState(false);
    
    // 구글 로그인
    const clientId = '357346370305-im49i267ggf9efg53vn0ndk11j5ud7m2.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/callback'; 
    
    const handleGoogleLogin = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile&include_granted_scopes=true&state=state_parameter_passthrough_value`;
        window.location.href = googleAuthUrl; // Google 로그인 페이지로 리다이렉트
    };
    

    // 카카오톡 로그인
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init('b2e7ab243f5aa2e4ed242b580bb2a646');  // 발급받은 JavaScript 키
        }
    }, []);
    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: function (authObj) {
            console.log('카카오 로그인 성공', authObj);

            window.Kakao.API.request({
                url: '/v2/user/me',
                success: function (res) {
                console.log('사용자 정보: ', res);
                // 사용자 정보를 상태에 저장하거나 처리
                const kakaoAccount = res.kakao_account;

                // 이메일 정보 확인 및 콘솔 출력
                if (kakaoAccount.has_email) {
                    console.log('사용자 이메일: ', kakaoAccount.email); 
                    console.log('사용자 이름: ', kakaoAccount.profile.nickname);
                    setKakaoLogin(true); // 카카오톡 로그인 확인
                    navigate("/")
                } else {
                    console.log('이메일 제공에 동의하지 않음');
                }
                },
                fail: function (error) {
                console.log('사용자 정보 요청 실패', error);
                },
            });
            },
            fail: function (err) {
            console.log('카카오 로그인 실패', err);
            },
        });
    };


    // 이메일 및 비밀번호 입력
    let [emailValue, setEmailValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    };

    // 일반 로그인
    // let [data, setData] = useState(null); // 데이터를 저장할 상태
    let [loading, setLoading] = useState(true); // 로딩 상태
    let [error, setError] = useState(null); // 에러 상태

    const fetchLoginData = async () => {
        console.log("최종 이메일 : ", emailValue);
        console.log("최종 비밀번호 : ", passwordValue);

        setLoading(true); // 로딩 시작
        try {
            const response = await fetch(`${api}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                    // nickname: "asdf",
                    // gender: "male"
                })
            });

            // status 확인
            console.log("status Code : ", response.status);
            console.log("Status Text:", response.statusText);

            if (response.status === 200) {
                // 성공적인 요청인 경우 (status 200)
                // const result = await response.json();
                // setData(result);
                const authorizationHeader = response.headers.get("authorization"); // "Bearer eyJhbGciOiJIUzI1NiJ..."
                if (authorizationHeader) {
                    const token = authorizationHeader.split(" ")[1]; // 공백으로 분리 후 두 번째 값 선택
                    localStorage.setItem("userToken", token); // 토큰 저장
                }
                console.log("토큰 값 : ", localStorage.getItem("userToken"));
                setSiteLogin(true);
                navigate('/')
            } else if (response.status === 401) {
                // 인증 실패 등의 상황 (status 401)
                setError("인증에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
            } else {
                // 그 외의 에러
                throw new Error(`Error: ${response.status} : ${response.statusText}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    useEffect(() => {
        if (loginBtn) {
            if (emailValue.length === 0) {
                alert("please enter your email!");
                setLoginBtn(false); 
            }else if (passwordValue.length === 0) {
                alert("please enter yout password!");
                setLoginBtn(false); 
            }else{
                fetchLoginData();
                setLoginBtn(false); 
            }
        }
    }, [loginBtn, emailValue, passwordValue]);


    // 페이지 이동
    const navigate = useNavigate();
    useEffect(() => {
        if(signupBtn) {
            navigate("/signup");
        }
    }, [signupBtn])

    return(
        <body className='login_container'>
            <div className='login_content'>
                <div className='login_input_content'>
                    <input onChange={handleEmailChange} className='login-email_input-content' placeholder='Email'></input>
                    <input onChange={handlePasswordChange} className='login-password_input-content' placeholder='Password' type='password'></input>
                </div>  
                <div className='login_pwd-forget_container'>
                    <div className='login_forget_content'>
                        Forgot password
                    </div>
                </div>
                <div className='login-signup_btn_container'>
                    <button onClick={() => setLoginBtn(true)} className='login_btn'>
                        Login
                    </button>
                    <div className='login-account_btn'>
                        <label style={{color:"#91929F"}}>Don't have account?</label> &nbsp; <label onClick={() => setSignupBtn(true)} style={{cursor:"pointer"}}>Sign up</label>
                    </div>
                </div>

                <div className='login_or_line_container'>
                    <div className='login_or_line_content'>
                        <div className='login_or_line' s tyle={{marginLeft:"40px"}}></div>
                        <div className='login_or'>
                            Or
                        </div>
                        <div className='login_or_line'></div>
                    </div>
                </div>
                <div className='login_google-kakao_container'>
                    <div onClick={handleGoogleLogin} className='login_google_content'>
                        <div className='login_google-kakao_img_content'>
                            <img src={`${process.env.PUBLIC_URL}/img/google-login.svg`} className='login_google_img'></img> 
                        </div>
                        <div className='login_google-kakao_text'>
                            Login with Google
                        </div>
                    </div>
                </div>
                <div className='login_google-kakao_container'>
                    <div onClick={handleKakaoLogin} className='login_kakao_content'>
                        <div className='login_google-kakao_img_content'>
                            <img src={`${process.env.PUBLIC_URL}/img/kakao.png`} className='login_kakao_img'></img> 
                            
                        </div>
                        <div className='login_google-kakao_text'>
                            Login with Kakao
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login_info;