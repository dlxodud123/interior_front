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
    
    let [myInfo, setMyInfo] = useState(
        { unique: '1', image: '사진', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' },
    );
    let [myFriendsInfo, setMyFriendsInfo] = useState([
        { unique: '1', image: '사진', username: '이태영', gender: 'male', age: 'twenties', range: 'public' },
        { unique: '2', image: 'default', username: '전영호', gender: 'male', age: 'thirties', range: 'public' },
        { unique: '3', image: 'default', username: '김하영', gender: 'female', age: 'twenties', range: 'private' },
        { unique: '4', image: '사진', username: '박민수', gender: 'unselected', age: 'twenties', range: 'public' },
        { unique: '5', image: 'default', username: '이준영', gender: 'unselected', age: 'twenties', range: 'private' },
        { unique: '6', image: 'default', username: '최은지', gender: 'female', age: 'thirties', range: 'public' },
        { unique: '7', image: '사진', username: '정지훈', gender: 'male', age: 'twenties', range: 'public' },
        { unique: '8', image: 'default', username: '오지혜', gender: 'female', age: 'twenties', range: 'private' },
        { unique: '9', image: 'default', username: '김우빈', gender: 'male', age: 'thirties', range: 'public' },
        { unique: '10', image: 'default', username: '한소희', gender: 'unselected', age: 'twenties', range: 'public' },
        { unique: '11', image: 'default', username: '신예은', gender: 'female', age: 'twenties', range: 'public' }
    ]);

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
                <My_info_detail my={myInfo}></My_info_detail>
                <div className='my_info_gap'></div>
                <My_info_friend friends={myFriendsInfo}></My_info_friend>
            </div>
        </body>
    )
}

export default My_info;