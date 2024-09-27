import './../css/login_form.css';
import React, { useContext } from 'react';
import { MyContext } from './../../App'; // Context 가져오기
import Header from "../../common/header/js/header";
import Login_info from './login_info';
import Footer from '../../common/footer/js/footer';

const Login_form = () => {
    const { api, setApi } = useContext(MyContext);

    return(
        <div className="login_form-container">
            <Header></Header>
            <div className="login_form-content">
                <Login_info></Login_info>
                {/* 로그인 {api} */}
            </div>
            <Footer className="login_form-footer"></Footer>    
        </div>
    )
}

export default Login_form;