import './../css/login_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { Children, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_info = () => {
    const { api, setKakaoLogin } = useContext(MyContext);

    let [signupBtn, setSignupBtn] = useState(false);
    
    // 구글 로그인
    const clientId = '357346370305-im49i267ggf9efg53vn0ndk11j5ud7m2.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/callback'; // ex: 'http://localhost:3000/callback'
    
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
                    <input className='login-email_input-content' placeholder='Email'></input>
                    <input type='password' className='login-password_input-content' placeholder='Password'></input>
                </div>  
                <div className='login_pwd-forget_container'>
                    <div className='login_forget_content'>
                        Forgot password
                    </div>
                </div>
                <div className='login-signup_btn_container'>
                    <button className='login_btn'>
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
                            <img src={`${process.env.PUBLIC_URL}/img/카톡.png`} className='login_kakao_img'></img> 
                            
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