import './../css/my_form.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import Header from '../../../common/header/js/header';
import My_info from './my_info';
import Footer from '../../../common/footer/js/footer';

const My_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className='my_form-container'>
            <Header></Header>
            <div className='my_form-content'>
                <My_info></My_info>
            </div>
            <Footer className='my_form-footer'></Footer>
        </div>
    )
}

export default My_form;