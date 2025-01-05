import { useState } from 'react';
import '../css/front.css';
import { frontData } from '../data/front_data';

const Front = () => {

    cosnt [categorySelect, setCategorySelect] = useState(1);

    return(
        <div className='front_container'>
            <div className='front_category_container'>
                <div className='front_category_content'>
                    <div className='front_category'>기술</div>
                    <div className='front_category'>포트폴리오</div>
                    <div className='front_category'>기업</div>
                </div>
            </div>
            <div className='front_title_content'>
                프론트엔드 질문 리스트
            </div>
            {frontData[0].buy}
        </div>
    )
}

export default Front;