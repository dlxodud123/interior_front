import './../css/my_friend_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import Header from '../../../common/header/js/header';
import My_friend_info from './my_friend_info';
import Footer from '../../../common/footer/js/footer';

const My_friend_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className='my_friend_form-container'>
            <Header></Header>
            <div className='my_friend_form-content'>
                <My_friend_info></My_friend_info>
            </div>
            <Footer className='my_friend_form-footer'></Footer>
        </div>
    )
}

export default My_friend_form;