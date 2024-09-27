import './../css/signup_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../App'; // Context 가져오기
import Header from "../../common/header/js/header";
import Footer from '../../common/footer/js/footer';

const Signup_form = () => {
    const { api, setApi } = useContext(MyContext);

    return(
        <body>
            <Header></Header>
            회원가입 {api}
            <Footer></Footer>
        </body>
    )
}

export default Signup_form;