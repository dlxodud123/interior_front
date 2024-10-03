import { useEffect } from 'react';
import './../test/test.css';

const Test = () => {
    const clientId = '357346370305-im49i267ggf9efg53vn0ndk11j5ud7m2.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/callback'; // ex: 'http://localhost:3000/callback'
    
    const handleGoogleLogin = () => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile&include_granted_scopes=true&state=state_parameter_passthrough_value`;
        window.location.href = googleAuthUrl; // Google 로그인 페이지로 리다이렉트
    };
    return(
        <div class="container">
            <section class="content">
                <aside>
                    <button onClick={handleGoogleLogin}>구글 로그인</button>
                </aside>
            </section>
        </div>       
    )
}

export default Test;