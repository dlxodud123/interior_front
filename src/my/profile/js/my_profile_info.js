import './../css/my_profile_info.css';
import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";

const My_profile_info = () => {
    const { api } = useContext(MyContext);

    let [usernameChangBtn, setUsernameChangeBtn] = useState(false);
    let [introduceChangBtn, setIntroduceChangeBtn] = useState(false);

    let [isOn, setIsOn] = useState('public');

    const rangeSwitch = () => {
        if (isOn === 'public') {
            setIsOn('private');
        }
        if (isOn === 'private') {
            setIsOn('public')
        }
    };

    const fileInputRef = useRef(null);
    let [imgURL, setImgURL] = useState(null);

    const handleImgChangeBtnClick = () => {
        fileInputRef.current.click();
      };
    
      // 파일 선택 후 미리보기 URL 생성 및 파일 정보 콘솔 출력
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          // 파일 URL 생성
          const imageURL = URL.createObjectURL(file);
          setImgURL(imageURL); // 이미지 미리보기 URL 상태로 저장
    
          // 파일 정보 콘솔 출력
          console.log('파일 이름:', file.name);
          console.log('파일 크기:', (file.size / 1024).toFixed(2), 'KB');
          console.log('파일 타입:', file.type);
          console.log('마지막 수정 시간 (타임스탬프):', file.lastModified);
          console.log('마지막 수정 시간 (Date 객체):', file.lastModifiedDate);
    
          // FileReader를 사용하여 파일 내용 읽기
          const reader = new FileReader();
    
          reader.onload = (e) => {
            console.log('파일 내용:', e.target.result); // 파일 내용을 콘솔에 출력
          };
    
          reader.readAsArrayBuffer(file); // 파일 내용을 ArrayBuffer로 읽기
        }
      };

    return(
        <body className='my_profile_info-container'>
            <div className='my_profile_info_title_content'>
                <label className='my_profile_info_title'>Profile Manage</label>
            </div>
            <div className='my_profile_info_img_content'>
                {
                    imgURL === null ? (
                        <IoMdPerson className='my_profile_info_profile_default_img'/>
                    ) : (
                        <img src={imgURL} className='my_profile_info_profile_img' />
                    )
                }
                {/* <img className='my_profile_info_profile_img' src={`${process.env.PUBLIC_URL}/img/아이유.jpeg`}></img> */}
                <div className='my_profile_info_img_change_container'>
                    <div>
                        <label className='my_profile_info_username'>이태영</label>
                    </div>
                    <div className='my_profile_info_img_change-delete_container' style={{marginTop:"10px"}}>
                        <div onClick={handleImgChangeBtnClick} className='my_profile_info_img_change_content'>
                            <label className='my_profile_info_img_change'>Image Change</label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div onClick={() => setImgURL(null)} className='my_profile_info_img_delete_content'>
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
            <div className='my_profile_info_detail_range_container'>
                <div className='my_profile_info_detail_range_title_content'>
                    <label className='my_profile_info_detail_range_title'>Profile Range</label>
                </div>
                <div className='my_profile_info_detail_range_name_container'>
                    <div className='my_profile_info_detail_range_name_content'>
                        {
                            isOn === 'public' ? 
                            <label className='my_profile_info_detail_range_name'>Public Profile</label>
                            : 
                            <label className='my_profile_info_detail_range_name'>Private Profile</label>
                    
                        }
                        {/* <label className='my_profile_info_detail_range_name'>Public Profile</label> */}
                    </div>

                    <div className={`range-switch ${isOn === 'private' ? 'private' : 'public'}`} onClick={rangeSwitch}>
                        <div className="range-circle"></div>
                    </div>

                </div>
            </div>
        </body>
    )
}

export default My_profile_info;