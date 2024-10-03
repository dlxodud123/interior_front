import './App.css';
import { Routes, Route } from 'react-router-dom'
import React, { createContext, useState } from 'react';
import Main_form from './main/js/main_form';
import Login_form from './login/js/login_form';
import Signup_form from './signup/js/signup_form';
import Callback from './google_callback/callback';

import Test from './test/test';

// Context 생성
export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [api] = useState('localhost:8080/api');
    const [googleLogin, setGoogleLogin] = useState(false);
    const [kakaoLogin, setKakaoLogin] = useState(false);

    return (
        <MyContext.Provider value={{ api, googleLogin, setGoogleLogin, kakaoLogin, setKakaoLogin }}>
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
          <Route path='/callback' element={<Callback></Callback>}></Route>
          
          <Route path='/test' element={<Test></Test>}></Route>
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
