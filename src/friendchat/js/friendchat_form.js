import './../css/friendchat_form.css';
import Header from '../../common/header/js/header';
import Friendchat_info from './friendchat_info';
import Footer from '../../common/footer/js/footer';

const Friendchat_from = () => {

    return(
        <div className='friendchat_from_container'>
            <Header></Header>
            <div className='friendchat_from_content'>
                <Friendchat_info></Friendchat_info>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Friendchat_from;