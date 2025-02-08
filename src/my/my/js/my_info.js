import './../css/my_info.css';
import My_info_detail from './my_info_detail';
import My_info_friend from './my_info_friend';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const My_info = () => {
    const { api } = useContext(MyContext);

    let [profileSettingBtn, setProfileSettingBtn] = useState(false);
    let [friendSettingBtn, setFriendSettingBtn] = useState(false);
    
    let myInfoDummy =  { unique: '1', image: 'default', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' };

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


    function securityEmail(email) {
        if (!email) {
            return "Unknown"; // 또는 기본값을 반환
        }
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
    }, [profileSettingBtn, friendSettingBtn, navigate])

    return(
        <body className='my_info-container'>
            <div className='my_info_profile_container'>
                <div className='my_info_profile_img_content'>
                    {myInfo.image === '사진' ? 
                        <img className='my_info_profile_img' src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`}></img>
                        :
                        myInfo.gender === 'male' ? 
                        <IoMdPerson className='my_profile_male_img' />
                        :
                        myInfo.gender === 'female' ? 
                        <IoMdPerson className='my_profile_female_img' />
                        :
                        <IoMdPerson className='my_profile_unselected_img' />
                    }
                </div>
                <div className='my_info_profile_info_content'>
                    <div className='my_info_profile_info_username_content'>
                        <label className='my_info_profile_info_username'>{myInfo.username}</label>
                    </div>
                    <div className='my_info_profile_info_email_content'>
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
            <div className='my_info_detail_friend_container'>
                <My_info_detail></My_info_detail>
                <div className='my_info_gap'></div>
                <My_info_friend></My_info_friend>
            </div>
        </body>
    )
}

export default My_info;