import { useState } from 'react';
import '../css/front.css';
import { frontData } from '../data/front_data';

const Front = () => {

    const [categorySelect, setCategorySelect] = useState(1);

    return(
        <div className='front_container'>
            <div className='front_title_content'>
                프론트엔드 질문 리스트
            </div>
            <div className='front_category_container'>
                <div className='front_category_content'>
                    <div onClick={() => setCategorySelect(1)} style={{ color: categorySelect === 1 ? '#3578FF' : '', backgroundColor: categorySelect === 1 ? 'white' : '' }} className='front_category'>기술</div>
                    <div onClick={() => setCategorySelect(2)} style={{ color: categorySelect === 2 ? '#3578FF' : '', backgroundColor: categorySelect === 2 ? 'white' : '' }} className='front_category'>포트폴리오</div>
                    <div onClick={() => setCategorySelect(3)} style={{ color: categorySelect === 3 ? '#3578FF' : '', backgroundColor: categorySelect === 3 ? 'white' : '' }} className='front_category'>기업</div>
                </div>
            </div>
            {frontData[0].buy}
        </div>
    )
}

export default Front;