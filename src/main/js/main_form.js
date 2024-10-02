import "./../css/main_form.css";
import React, { useContext } from 'react';
import { MyContext } from './../../App'; // Context 가져오기
import Header from "../../common/header/js/header";
import Main_video from "./main_video";
import Footer from "../../common/footer/js/footer";

const Main_form = () => {
    const { api, setApi } = useContext(MyContext);

    return(
        <div className="main_form-container">
            <Header></Header>
            <div className="main_form-content">
                <Main_video></Main_video>
                {/* 메인 {api} */}
            </div>
            <Footer className="main_form-footer"></Footer>    
        </div>
    )
}

export default Main_form;