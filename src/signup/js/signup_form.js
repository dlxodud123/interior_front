import './../css/signup_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App'; // Context 가져오기
import Header from "../../common/header/js/header";
import Signup_info from './signup_info';
import Footer from '../../common/footer/js/footer';

const Signup_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className="signup_form-container">
            <Header></Header>
            <div className="signup_form-content">
                <Signup_info></Signup_info>
                {/* 회원가입 {api} */}
            </div>
            <Footer className="signup_form-footer"></Footer>    
        </div>
    )
}

export default Signup_form;