import './App.css';
import { Routes, Route } from 'react-router-dom'
import React, { createContext, useState } from 'react';
import Main_form from './main/js/main_form';
import Login_form from './login/js/login_form';
import Signup_form from './signup/js/signup_form';
import My_form from './my/my/js/my_form';
import My_profile_form from './my/profile/js/my_profile_form';
import My_friend_form from './my/friend/js/my_friend_form';
import Callback from './google_callback/callback';
import Randomchat_form from './randomchat/js/randomchat_form';

import Test from './test/test';
import Video from './video_server/video';
import Front from './quiz/js/front';
import Back from './quiz/js/back';

// Context 생성
export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [api] = useState('https://api.random-chat.site');
    const [socket] = useState('wss://api.random-chat.site')
    const [googleLogin, setGoogleLogin] = useState(false);
    const [kakaoLogin, setKakaoLogin] = useState(false);

    const [siteLogin, setSiteLogin] = useState(false);

    return (
        <MyContext.Provider value={{ api, socket, googleLogin, setGoogleLogin, kakaoLogin, setKakaoLogin, siteLogin, setSiteLogin }}>
            {children}
        </MyContext.Provider>
    );
};

function App() {
  return (
    <MyProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main_form />}></Route>
          <Route path='/login' element={<Login_form />}></Route>
          <Route path='/signup' element={<Signup_form />}></Route>
          <Route path='/my' element={<My_form />}></Route>
          <Route path='/my/profile' element={<My_profile_form />}></Route>
          <Route path='/my/friend' element={<My_friend_form></My_friend_form>}></Route>
          <Route path='/callback' element={<Callback></Callback>}></Route>
          <Route path='/randomchat' element={<Randomchat_form></Randomchat_form>}></Route>
          
          <Route path='/test' element={<Test></Test>}></Route>
          <Route path='/video' element={<Video></Video>}></Route>

          <Route path='/front' element={<Front></Front>}></Route>
          <Route path='/back' element={<Back></Back>}></Route>
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
