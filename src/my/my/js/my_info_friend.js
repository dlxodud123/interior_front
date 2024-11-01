import './../css/my_info_friend.css';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { CiLock } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";

const My_info_friend = () => {
    const { api } = useContext(MyContext);

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

    let [moreBtn, setMoreBtn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (moreBtn) {
            navigate("/my/friend")
            setMoreBtn(false);
        }
    }, [moreBtn, navigate])

    return(
        <div className='my_info_friend_container'>
            {myFriendsInfo.slice(0, 4).map((friend) => (
                friend.range === "private" ? 
                <div className='my_info_friend_private_content'>
                    <CiLock className='my_info_friend_private_lock' />
                    <label className='my_info_friend_private_text'>It's a private profile</label>
                </div>
                :
                <div className="my_info_friend_content">
                    <div className='my_info_friend_img_content'>
                        {
                            friend.image === 'default' ? 
                                friend.gender === 'male' ? 
                                <IoMdPerson className='my_info_friend_default_male_img' />
                                :
                                friend.gender === 'female' ?
                                <IoMdPerson className='my_info_friend_default_female_img' />
                                : 
                                <IoMdPerson className='my_info_friend_default_unselected_img' />
                            :
                            <img src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`} className='my_info_friend_img'></img>
                        }
                    </div>
                    <div className='my_info_friend_username_content'>
                        <label className='my_info_friend_username'>{friend.username}</label>
                    </div>
                    <div className='my_info_friend_gender_content'>
                        <label className='my_info_friend_gender'>{friend.gender}</label>
                    </div>
                    <div className='my_info_friend_age_content'>
                        <label className='my_info_friend_age'>{friend.age}</label>
                    </div>
                </div>
            ))}
            {myFriendsInfo.length > 4 && (
                <div className='my_info_friend_more_content'>
                    <label onClick={() => setMoreBtn(true)} className='my_info_friend_more'>+ more</label>
                </div>
            )}
        </div>
    )
}

export default My_info_friend;