import './../css/my_info_detail.css';
import { MyContext } from '../../../App';
import { useContext, useState } from 'react';

const My_info_detail = () => {
    const { api } = useContext(MyContext);

    let [myInfo, setMyInfo] = useState(
        { unique: '1', image: '사진', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' },
    );

    return(
        <div className='my_info_content'>
            <div className='my_info_introduce_content'>
                <div className='my_info_title_content'>
                    <label className='my_info_title'>Introduce</label>
                </div>
                <label className='my_info_colon'>:</label>
                <label className='my_info_text'>{myInfo.introduce}</label>
            </div>
            <div className='my_info_gender_content'>
                <div className='my_info_title_content'>
                    <label className='my_info_title'>Gender</label>
                </div>
                <label className='my_info_colon'>:</label>
                <label className='my_info_text'>{myInfo.gender}</label>
            </div>
            <div className='my_info_age_content'>
                <div className='my_info_title_content'>
                    <label className='my_info_title'>Age</label>
                </div>
                <label className='my_info_colon'>:</label>
                <label className='my_info_text'>{myInfo.age}</label>
            </div>
            <div className='my_info_range_content'>
                <div className='my_info_title_content'>
                    <label className='my_info_title'>Range</label>
                </div>
                <label className='my_info_colon'>:</label>
                <label className='my_info_text'>{myInfo.range}</label>
            </div>
        </div>
    )
}

export default My_info_detail;