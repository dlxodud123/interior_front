import './../css/login_info.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_info = () => {

    let [signupBtn, setSignupBtn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if(signupBtn) {
            navigate("/signup");
        }
    }, [signupBtn])

    return(
        <body className='login_container'>
            <div className='login_content'>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <input className='login-email_input-content' placeholder='Email'></input>
                    <input className='login-password_input-content' placeholder='Password'></input>
                </div>  
                <div className='login_pwd-forget_container'>
                    <div className='login_forget_content'>
                        Forgot password
                    </div>
                    <div className='login_pwd-forget_container_gap'></div>
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
                    <div className='login_google_content'>
                        <div className='login_google-kakao_img_content'>
                            <img src={`${process.env.PUBLIC_URL}/img/google-login.svg`} className='login_google_img'></img> 
                        </div>
                        <div className='login_google-kakao_text'>
                            Login with Google
                        </div>
                    </div>
                </div>
                <div className='login_google-kakao_container'>
                    <div className='login_kakao_content'>
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