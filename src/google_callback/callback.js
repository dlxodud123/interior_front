import { useEffect } from 'react';
import React, { useContext } from 'react';
import { MyContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const { api, setGoogleLogin} = useContext(MyContext);

    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1)); // # 뒤의 값을 추출
        const accessToken = params.get('access_token'); // 토큰을 추출

        if (accessToken) {
        console.log('Access Token:', accessToken);

        // 사용자 정보를 요청하는 API 호출
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        return response.json(); // JSON 형태로 응답 변환
        })
        .then((userInfo) => {
        console.log('사용자 정보: ', userInfo);
        console.log('사용자 이메일: ', userInfo.email);
        console.log('사용자 이름: ', userInfo.name)
        // 사용자 정보를 상태에 저장하거나 처리
        })
        .catch((error) => {
        console.error('사용자 정보 요청 실패:', error);
        });

        setGoogleLogin(true); // 구글 로그인 확인

        navigate('/'); // 토큰 처리 후 원하는 페이지로 이동
        }
    }, [navigate]);

    return (
        <div>
        <h1>Google Login Callback</h1>
        </div>
    );
};

export default Callback;