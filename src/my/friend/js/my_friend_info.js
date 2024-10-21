import './../css/my_friend_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';

const My_friend_info = () => {
    const { api } = useContext(MyContext);

    return(
        <body className='my_friend_info-container'>
            <div className='my_friend_info_title_container'>
                <div className='my_friend_info_title_content'> 
                    <label className='my_friend_info_title'>Friend Manage</label>
                </div>
            </div>
        </body>
    )
}

export default My_friend_info;