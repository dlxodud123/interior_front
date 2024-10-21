import './../css/my_info.css';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const My_info = () => {
    const { api } = useContext(MyContext);

    let [imgAvailable, setImgAvailable] = useState(true);
    let [profileSettingBtn, setProfileSettingBtn] = useState(false);
    let [friendSettingBtn, setFriendSettingBtn] = useState(false);

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
                        <label className='my_info_profile_info_username'>이태영</label>
                    </div>
                    <div className='my_infoprofile_info_email_content'>
                        <label className='my_info_profile_info_email'>
                            {securityEmail('xodud5080@naver.com')}
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
        </body>
    )
}

export default My_info;