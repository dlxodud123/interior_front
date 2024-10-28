import './../css/my_friend_info.css';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { FiSearch } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { BsChatDotsFill } from "react-icons/bs";

const My_friend_info = () => {
    const { api } = useContext(MyContext);

    let [friendsInfo, setFriendsInfo] = useState([
        { unique: '1', image: '사진', username: '이태영', gender: 'male', age: 'twenties', range: 'public' },
        { unique: '2', image: 'default', username: '전영호', gender: 'male', age: 'thirties', range: 'public' },
        { unique: '3', image: 'default', username: '김하영', gender: 'female', age: 'twenties', range: 'private' },
        { unique: '4', image: '사진', username: '박민수', gender: 'unselected', age: 'twenties', range: 'public' },
        { unique: '5', image: 'default', username: '이준영', gender: 'male', age: 'twenties', range: 'private' },
        { unique: '6', image: 'default', username: '최은지', gender: 'female', age: 'thirties', range: 'public' },
        { unique: '7', image: '사진', username: '정지훈', gender: 'male', age: 'twenties', range: 'public' },
        { unique: '8', image: 'default', username: '오지혜', gender: 'female', age: 'twenties', range: 'private' },
        { unique: '9', image: 'default', username: '김우빈', gender: 'male', age: 'thirties', range: 'public' },
        { unique: '10', image: 'default', username: '한소희', gender: 'unselected', age: 'twenties', range: 'public' },
        { unique: '11', image: 'default', username: '신예은', gender: 'female', age: 'twenties', range: 'public' }
    ]);
    
    // searchTerm 상태를 추가하여 검색어를 관리
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const friendsPerPage = 5; // 페이지당 친구 수

    
    // 검색된 친구 목록 필터링
    const filteredFriends = friendsInfo.filter(friend =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지 수 계산
    const friendPage = Math.max(1, Math.ceil(filteredFriends.length / friendsPerPage)); 

    // 현재 페이지에 해당하는 친구 목록 가져오기
    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriends = filteredFriends.slice(indexOfFirstFriend, indexOfLastFriend);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // 검색어가 변경될 때 페이지를 첫 페이지로 초기화
    };

    useEffect(() => {
        console.log("페이지 수 : ", friendPage);
    }, [friendPage]);

    return(
        <body className='my_friend_info-container'>
            <div className='my_friend_info_title_container'>
                <div className='my_friend_info_title_content'> 
                    <label className='my_friend_info_title'>Friend Manage</label>
                </div>
            </div>

            <div className='my_friend_info_search_container'>
                <input 
                    className='my_friend_info_searh_input' 
                    placeholder='Username Search' 
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
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
                    <div className='my_friend_info_detail_chat_title_container'>
                        <label className='my_friend_info_detail_title'>Chat</label>
                    </div>
                    <div className='my_friend_info_detail_delete_title_container'>
                        <label className='my_friend_info_detail_title'>Delete</label>
                    </div>
                </div>
                {currentFriends.map((friend, index) => (
                    <div className='my_friend_info_detail_content'>
                        {
                            friend.range === 'private' ? 
                            <>
                                <div className='my_friend_info_detail_private_content'>
                                    <div className='my_friend_info_detail_private_lock_content'>
                                        <CiLock className='my_friend_info_detail_private_lock' />
                                    </div>
                                    <div className='my_friend_info_detail_private_text_content'>
                                        <label className='my_friend_info_detail_private_text'>It's a private profile</label>
                                    </div>
                                </div>
                                <div className='my_friend_info_detail_delete_container'>
                                    <div className='my_friend_info_detail_delete_content'>
                                        <label className='my_friend_info_detail_delete'>Delete</label>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className='my_friend_info_detail_img_content'>
                                    {
                                        friend.image === 'default' ? 
                                            friend.gender === 'male' ? 
                                            <IoMdPerson className='my_friend_info_detail_default_male_img' />
                                            :
                                            friend.gender === 'female' ?
                                            <IoMdPerson className='my_friend_info_detail_default_female_img' />
                                            : 
                                            <IoMdPerson className='my_friend_info_detail_default_unselected_img' />
                                        :
                                        <img src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`} className='my_friend_info_detail_img'></img>
                                    }
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
                                <div className='my_friend_info_detail_chat_container'>
                                    <BsChatDotsFill className='my_friend_info_detail_chat' />
                                </div>
                                <div className='my_friend_info_detail_delete_container'>
                                    <div className='my_friend_info_detail_delete_content'>
                                        <label className='my_friend_info_detail_delete'>Delete</label>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
            <div className='pagination_content'>
                {filteredFriends.length > 0 && (
                    Array.from({ length: friendPage }, (_, index) => (
                        <button 
                            key={index} 
                            onClick={() => handlePageChange(index + 1)} 
                            className={`pagination_btn ${currentPage === (index + 1) ? 'active' : ''}`}
                        >
                            <label className='pagination'>{index + 1}</label>
                        </button>
                    ))
                )}
            </div>
        </body>
    )
}

export default My_friend_info;