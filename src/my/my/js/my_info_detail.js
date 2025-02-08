import './../css/my_info_detail.css';
import { MyContext } from '../../../App';
import { useContext, useEffect, useState } from 'react';

const My_info_detail = (props) => {
    const { api } = useContext(MyContext);

    let myInfoDummy =  { unique: '1', image: '사진', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' };
    
    let [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        setMyInfo(myInfoDummy);

        const fetchMyData = async () => {
            try {
                const response = await fetch(`${api}/my`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: localStorage.getItem('userToken')
                    })
                });

                if (response.status === 200) {
                    setMyInfo(response.data);
                } else {
                    console.log("Response status not 200");
                }
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyData();
    }, [])

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