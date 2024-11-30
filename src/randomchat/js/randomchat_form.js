import './../css/randomchat_form.css';
import { useContext } from 'react';
import { MyContext } from '../../App';
import Header from '../../common/header/js/header';
import Randomchat_info from './randomchat_info';
import Footer from '../../common/footer/js/footer';

const Randomchat_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className='randomchat_form_container'>
            <Header></Header>
            <div className='randomchat_form_content'>
                <Randomchat_info></Randomchat_info>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Randomchat_form;