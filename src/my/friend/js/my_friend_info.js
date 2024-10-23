import './../css/my_friend_info.css';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { FiSearch } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";

const My_friend_info = () => {
    const { api } = useContext(MyContext);

    let [friendImg, setFriendImg] = useState('');
    let [friendRange, setFriendRange] = useState('public');
    let [friendUsername, setFriendUsername] = useState('이태영');
    let [friendGender, setFriendGender] = useState('male');
    let [friendAge, setFriendAge] = useState('twenties');
    let [test, setTest] = useState([
        { name: '이태영', age: '20' },
        { name: '지효준', age: '30' },
    ]);
    // let [friendIntroduce, setFriendIntroduce] = useState('안녕하세요');
    
    // pagination 구현 
    const friendsPerPage = 5; // 페이지당 친구 수
    const [friendNum, setFriendNum] = useState(11); // 총 친구 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [friendPage, setFriendPage] = useState(Math.ceil(friendNum / friendsPerPage)); // 페이지 수

    // 더미데이터
    const friends = Array.from({ length: friendNum }, (_, index) => ({
        id: index,
        username: `${friendUsername}${index + 1}`,
        gender: `${friendGender}`,
        age: `${friendAge}`,
    }));

    // 현재 페이지에 해당하는 친구 목록 가져오기
    const indexOfLastFriend = currentPage * friendsPerPage; // 마지막 친구 인덱스
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage; // 첫 번째 친구 인덱스
    const currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend); // 현재 페이지 친구들

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        console.log("페이지 수 : ", friendPage);
        console.log("test : ", test[0].name);
    });

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
                    <div className='my_friend_info_detail_username_title_container'>
                        <label className='my_friend_info_detail_title'>Username</label>
                    </div>
                    <div className='my_friend_info_detail_gender_title_container'>
                        <label className='my_friend_info_detail_title'>Gender</label>
                    </div>
                    <div className='my_friend_info_detail_age_title_container'>
                        <label className='my_friend_info_detail_title'>Age</label>
                    </div>
                    <div className='my_friend_info_detail_delete_title_container'>
                        <label className='my_friend_info_detail_title'>Delete</label>
                    </div>
                </div>
                {currentFriends.map(friend => (
                    <div className='my_friend_info_detail_content'>
                        <div className='my_friend_info_detail_img_content'>
                            {
                                <img src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`} className='my_friend_info_detail_img'></img>
                            }
                            {/* <IoMdPerson className='my_friend_info_detail_default_img' /> */}
                        </div>
                        <div className='my_friend_info_detail_info_username_content'>
                            <label className='my_friend_info_detail_info_username'>{friend.username}</label>
                        </div>
                        <div className='my_friend_info_detail_info_gender_content'>
                            <label className='my_friend_info_detail_info_gender'>{friend.gender}</label>
                        </div>
                        <div className='my_friend_info_detail_info_age_content'>
                            <label className='my_friend_info_detail_info_age'>{friend.age}</label>
                        </div>
                        {/* <div className='my_friend_info_detail_info_introduce_content'>
                            <label className='my_friend_info_detail_info_introduce'>Hello my name is Lee Tae Young</label>
                        </div> */}
                        <div className='my_friend_info_detail_delete_container'>
                            <div className='my_friend_info_detail_delete_content'>
                                <label className='my_friend_info_detail_delete'>Delete</label>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='pagination'>
                    {Array.from({ length: friendPage }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </body>
    )
}

export default My_friend_info;