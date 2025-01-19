import './../css/randomvideo_form.css';
import { useContext } from 'react';
import { MyContext } from '../../App';
import Header from '../../common/header/js/header';
import Randomvideo_info from './randomvideo_info';
import Footer from '../../common/footer/js/footer';

const Randomvideo_form = () => {
    const { api } = useContext(MyContext);

    return(
        <div className='ramdonvideo_form_container'>
            <Header></Header>
            <div className='randomvideo_from_content'>
                <Randomvideo_info></Randomvideo_info>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Randomvideo_form