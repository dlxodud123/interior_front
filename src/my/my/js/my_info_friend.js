import { useContext, useState } from 'react';
import { MyContext } from '../../../App';
import './../css/my_info_friend.css';

const My_info_friend = () => {
    const { api } = useContext(MyContext);

    let [myFriendsInfo, setMyFriendsInfo] = useState([
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

    return(
        <div>

        </div>
    )
}

export default My_info_friend;