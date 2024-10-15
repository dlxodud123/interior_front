import './../css/my_profile_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import Header from '../../../common/header/js/header';
import My_profile_info from './my_profile_info';
import Footer from '../../../common/footer/js/footer';

const My_profile_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className='my_profile_form-container'>
            <Header></Header>
            <div className='my_profile_form-content'>
                <My_profile_info></My_profile_info>
            </div>
            <Footer className='my_profile_form-footer'></Footer>
        </div>
    )
}

export default My_profile_form;