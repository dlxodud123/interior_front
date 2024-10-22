import './../css/my_friend_info.css';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { FiSearch } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";

const My_friend_info = () => {
    const { api } = useContext(MyContext);

    let [friendImg, setFriendImg] = useState('');
    let [friendRange, setFriendRange] = useState('public');
    let [friendGender, setFriendGender] = useState('male');
    let [friendUsername, setFriendUsername] = useState('이태영');
    let [friendIntroduce, setFriendIntroduce] = useState('안녕하세요');
    
    let [friendNum, setFriendNum] = useState(11);
    let [friendPage, setFriendPage] = useState(Math.ceil(friendNum / 5));

    useEffect(() => {
        console.log("페이지 수 : ", friendPage);
    })
    return(
        <body className='my_friend_info-container'>
            <div className='my_friend_info_title_container'>
                <div className='my_friend_info_title_content'> 
                    <label className='my_friend_info_title'>Friend Manage</label>
                </div>
            </div>

            <div className='my_friend_info_search_container'>
                <input className='my_friend_info_searh_input' placeholder='Username Search' type='text'></input>
                <div className='my_friend_info_search_content'>
                    <FiSearch className='my_friend_info_search' />
                </div>
            </div>

            <div className='my_friend_info_detail_container'>
                <div className='my_friend_info_detail_title_container'>
                    <div className='my_friend_info_detail_img_title_container'>
                        <label className='my_friend_info_detail_title'>Image</label>
                    </div>
                    <div className='my_friend_info_detail_info_title_container'>
                        <label className='my_friend_info_detail_title'>Information</label>
                    </div>
                    <div className='my_friend_info_detail_modify_title_container'>
                        <label className='my_friend_info_detail_title'>Modify</label>
                    </div>
                </div>

                <div className='my_friend_info_detail_content'>
                    <div className='my_friend_info_detail_img_content'>
                        {

                        }
                        <img src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`} className='my_friend_info_detail_img'></img>
                        <IoMdPerson className='my_friend_info_detail_default_img' />
                    </div>
                    <div className='my_friend_info_detail_info_content'>

                    </div>
                    <div className='my_friend_info_detail_modify_content'>

                    </div>
                </div>
            </div>
        </body>
    )
}

export default My_friend_info;