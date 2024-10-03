import './../css/login_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App';
import Header from "../../common/header/js/header";
import Login_info from './login_info';
import Footer from '../../common/footer/js/footer';

const Login_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className="login_form-container">
            <Header></Header>
            <div className="login_form-content">
                <Login_info></Login_info>
            </div>
            <Footer className="login_form-footer"></Footer>    
        </div>
    )
}

export default Login_form;