import './../css/my_profile_info.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";

const My_profile_info = () => {
    const { api } = useContext(MyContext);

    let [usernameChangeBtn, setUsernameChangeBtn] = useState(false);
    let [introduceChangeBtn, setIntroduceChangeBtn] = useState(false);

    // username 부분
    let [defaultUsernameInputValue, setDefaultUsernameInputValue] = useState('이태영')
    let [usernameInputValue, setUsernameInputValue] = useState(defaultUsernameInputValue);
    let [finalUsernameInputValue, setFinalUsernameInputValue] = useState('');

    const handleUsernameChange = (event) => {
        setUsernameInputValue(event.target.value);
        console.log("username : ", usernameInputValue);
    }

    const handleFinalUsernameSaveBtn = () => {
        setFinalUsernameInputValue(usernameInputValue);
    }

    useEffect(() => {
        console.log("최종 저장 username : ", finalUsernameInputValue);
    }, [finalUsernameInputValue]);

    // introduce 부분
    let [defaultIntroduceInputValue, setDefaultIntroduceInputValue] = useState('Introduce Yourself')
    let [introduceInputValue, setIntroduceInputValue] = useState(defaultIntroduceInputValue);
    let [finalIntroduceInputValue, setFinalIntroduceInputValue] = useState('');

    const handleIntroduceChange = (event) => {
        setIntroduceInputValue(event.target.value);
        console.log("introduce : ", introduceInputValue);
    }

    const handleFinalIntroduceSaveBtn = () => {
        setFinalIntroduceInputValue(introduceInputValue);
    }

    useEffect(() => {
        console.log("최종 저장 introduce : ", finalIntroduceInputValue);
    }, [finalIntroduceInputValue]);

    // 공개범위 부분
    let [isOn, setIsOn] = useState('public');

    const rangeSwitch = () => {
        if (isOn === 'public') {
            setIsOn('private');
        }
        if (isOn === 'private') {
            setIsOn('public')
        }
    };

    useEffect(() => {
        console.log("공개범위 : ", isOn)
    }, [isOn])

    // 프로필 사진 부분
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
                <div className='my_profile_info_img_change_container'>
                    <div>
                        <label className='my_profile_info_username'>{defaultUsernameInputValue}</label>
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
                {
                    usernameChangeBtn ? 
                    <>
                        <div>
                            <label className='my_profile_info_detail_username_modify_title'>Username </label>
                        </div>
                        <div className='my_profile_info_detail_username_container'>
                            <input value={usernameInputValue} onChange={handleUsernameChange} type='text' className='my_profile_info_detail_username_modify_text_container'>
                            </input>
                        </div>
                        <div className='my_profile_info_detail_username_modify_container'>
                            <div onClick={() => {setUsernameChangeBtn(false); setUsernameInputValue(defaultUsernameInputValue)}} className='my_profile_info_detail_username_modify_cancel_content'>
                                <label className='my_profile_info_detail_username_modify_cancel'>Cancel</label>
                            </div>
                            <div className='my_profile_info_detail_username_modify_blank' />
                            <div onClick={() => {setUsernameChangeBtn(false); handleFinalUsernameSaveBtn();}} className='my_profile_info_detail_username_modify_save_content'>
                                <label  className='my_profile_info_detail_username_modify_save'>Save</label>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <label className='my_profile_info_detail_username_title'>Username </label>
                        </div>
                        <div className='my_profile_info_detail_username_container'>
                            <div className='my_profile_info_detail_username_content'>
                                <label className='my_profile_info_detail_username'>{defaultUsernameInputValue}</label>
                            </div>
                            <div onClick={() => setUsernameChangeBtn(true)} className='my_profile_info_detail_username_change_content'>
                                <label className='my_profile_info_detail_username_change'>Change</label>
                            </div>
                        </div>
                        <div className='my_profile_info_detail_username_underline'></div>
                    </>
                }
                {
                    introduceChangeBtn ? 
                    <>
                        <div className='my_profile_info_detail_introuduce_title_content'>
                            <label className='my_profile_info_detail_introduce_modify_title'>Introduce</label>
                        </div>
                        <div className='my_profile_info_detail_introduce_container'>
                            <input placeholder={introduceInputValue} onChange={handleIntroduceChange} type='text' className='my_profile_info_detail_introduce_modify_text_container'>
                            </input>
                            {/* <div className='my_profile_info_detail_introduce_content'>
                                <label className='my_profile_info_detail_introduce'>Introduce Yourself</label>
                            </div> */}
                        </div>

                        <div className='my_profile_info_detail_introduce_modify_container'>
                            <div onClick={() => {setIntroduceChangeBtn(false); setIntroduceInputValue(defaultIntroduceInputValue)}} className='my_profile_info_detail_introduce_modify_cancel_content'>
                                <label className='my_profile_info_detail_introduce_modify_cancel'>Cancel</label>
                            </div>
                            <div className='my_profile_info_detail_introduce_modify_blank' />
                            <div onClick={() => {setIntroduceChangeBtn(false); handleFinalIntroduceSaveBtn();}} className='my_profile_info_detail_introduce_modify_save_content'>
                                <label  className='my_profile_info_detail_introduce_modify_save'>Save</label>
                            </div>
                        </div>
                    </>
                    :
                    <>
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
                    </>
                }
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