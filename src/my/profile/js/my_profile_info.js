import './../css/my_profile_info.css';
import React, { useContext } from 'react';
import { MyContext } from '../../../App';

const My_profile_info = () => {
    const { api } = useContext(MyContext);

    return(
        <body className='my_profile_info-container'>
            <div className='my_profile_info_title_content'>
                <label className='my_profile_info_title'>프로필 관리</label>
            </div>
            <div className='my_profile_info_img_content'>
                <img className='my_profile_info_profile_img' src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`}></img>
                <div className='my_profile_info_img_change_container'>
                    <div className='my_profile_info_username_content'>
                        <label className='my_profile_info_username'>이태영</label>
                    </div>
                    <div className='my_profile_info_img_change-delete_container' style={{marginTop:"10px"}}>
                        <div className='my_profile_info_img_change_content'>
                            <label className='my_profile_info_img_change'>이미지 변경</label>
                        </div>
                        <div className='my_profile_info_img_delete_content'>
                            <label className='my_profile_info_img_delete'>삭제</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my_profile_info_detail_container'>
                <label>프로필 정보</label>
            </div>
        </body>
    )
}

export default My_profile_info;