import './../css/my_profile_info.css';
import React, { useContext, useState } from 'react';
import { MyContext } from '../../../App';

const My_profile_info = () => {
    const { api } = useContext(MyContext);

    let [imgChangeBtn, setImgChangeBtn] = useState(false);
    let [imgDeleteBtn, setImgDeleteBtn] = useState(false);
    let [usernameChangBtn, setUsernameChangeBtn] = useState(false);
    let [introduceChangBtn, setIntroduceChangeBtn] = useState(false);

    return(
        <body className='my_profile_info-container'>
            <div className='my_profile_info_title_content'>
                <label className='my_profile_info_title'>Profile Manage</label>
            </div>
            <div className='my_profile_info_img_content'>
                <img className='my_profile_info_profile_img' src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`}></img>
                <div className='my_profile_info_img_change_container'>
                    <div>
                        <label className='my_profile_info_username'>이태영</label>
                    </div>
                    <div className='my_profile_info_img_change-delete_container' style={{marginTop:"10px"}}>
                        <div onClick={() => setImgChangeBtn(true)} className='my_profile_info_img_change_content'>
                            <label className='my_profile_info_img_change'>Image Change</label>
                        </div>
                        <div onClick={() => setImgDeleteBtn(true)} className='my_profile_info_img_delete_content'>
                            <label className='my_profile_info_img_delete'>Delete</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my_profile_info_detail_container'>
                <div className='my_profile_info_detail_title_content'>
                    <label className='my_profile_info_detail_title'>Profile Information</label>
                </div>
                <div>
                    <label className='my_profile_info_detail_username_title'>Username </label>
                </div>
                <div className='my_profile_info_detail_username_container'>
                    <div className='my_profile_info_detail_username_content'>
                        <label className='my_profile_info_detail_username'>이태영</label>
                    </div>
                    <div onClick={() => setUsernameChangeBtn(true)} className='my_profile_info_detail_username_change_content'>
                        <label className='my_profile_info_detail_username_change'>Change</label>
                    </div>
                </div>
                <div className='my_profile_info_detail_username_underline'></div>
            

                <div className='my_profile_info_detail_introuduce_title_content'>
                    <label className='my_profile_info_detail_introduce_title'>Introduce</label>
                </div>
                <div className='my_profile_info_detail_introduce_container'>
                    <div className='my_profile_info_detail_introduce_content'>
                        <label className='my_profile_info_detail_introduce'>Introduce Yourself</label>
                    </div>
                    <div onClick={() => setIntroduceChangeBtn(true)} className='my_profile_info_detail_introduce_change_content'>
                        <label className='my_profile_info_detail_introduce_change'>Change</label>
                    </div>
                </div>
                <div className='my_profile_info_detail_introduce_underline'></div>
            </div>
        </body>
    )
}

export default My_profile_info;