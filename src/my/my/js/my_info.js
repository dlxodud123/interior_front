import './../css/my_info.css';
import My_info_detail from './my_info_detail';
import My_info_friend from './my_info_friend';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const My_info = () => {
    const { api } = useContext(MyContext);

    let [imgAvailable, setImgAvailable] = useState(true);
    let [profileSettingBtn, setProfileSettingBtn] = useState(false);
    let [friendSettingBtn, setFriendSettingBtn] = useState(false);
    let [myInfo, setMyInfo] = useState(
        { unique: '1', image: '사진', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' },
    );

    useEffect(() => {
        console.log("이메일 : ", myInfo.email);
    })

    function securityEmail(email) {
        const [localPart, domain] = email.split('@');
        const maskedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
        return `${maskedLocalPart}@${domain}`;
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (profileSettingBtn) {
            navigate('/my/profile');
            setProfileSettingBtn(false);
        }
        if (friendSettingBtn) {
            navigate('/my/friend');
            setFriendSettingBtn(false);
        }
    }, [profileSettingBtn, friendSettingBtn])

    return(
        <body className='my_info-container'>
            <div className='my_info_profile_container'>
                <div className='my_info_profile_img_content'>
                    {imgAvailable ? 
                        <img className='my_info_profile_img' src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`}></img>
                        :
                        <img className='my_profile_img' src={`https://kream.co.kr/_nuxt/img/blank_profile.538b7ac.png`}></img>
                    }
                </div>
                <div className='my_info_profile_info_content'>
                    <div className='my_info_profile_info_username_content'>
                        <label className='my_info_profile_info_username'>{myInfo.username}</label>
                    </div>
                    <div className='my_infoprofile_info_email_content'>
                        <label className='my_info_profile_info_email'>
                            {securityEmail(myInfo.email)}
                        </label>
                    </div>
                </div>
                <div className='my_info_profile_management_container'>
                    <div onClick={() => setProfileSettingBtn(true)} className='my_info_profile_management_content'>
                        <label className='my_info_profile_management'>Profile Manage</label>
                    </div>
                </div>
                <div className='my_info_friend_management_container'>
                    <div onClick={() => setFriendSettingBtn(true)} className='my_info_friend_management_content'>
                        <label className='my_info_friend_management'>Friend Manage</label>
                    </div>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <My_info_detail></My_info_detail>
                <div className='my_info_gap'></div>
                <My_info_friend></My_info_friend>
                
                {/* <div className='my_info_content'>
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
                </div> */}

            </div>
        </body>
    )
}

export default My_info;