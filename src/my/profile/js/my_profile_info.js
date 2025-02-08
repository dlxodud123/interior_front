import './../css/my_profile_info.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../../../App';
import { IoMdPerson } from "react-icons/io";

const My_profile_info = () => {
    const { api } = useContext(MyContext);

    let myInfoDummy =  { unique: '1', image: 'default', email: 'xodud5080@naver.com', introduce:'안녕하세요', username: '이태영', gender: 'male', age: 'twenties', range: 'public' };

    let [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        setDefaultUsernameInputValue(myInfo.username);
        setDefaultIntroduceInputValue(myInfo.introduce);
        setDefaultGender(myInfo.gender);
        setDefaultAge(myInfo.age);
        setIsOn(myInfo.range);
    }, [myInfo])

    useEffect(() => {
        setMyInfo(myInfoDummy);

        const fetchMyData = async () => {
            try {
                const response = await fetch(`${api}/my`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: localStorage.getItem('userToken')
                    })
                });

                if (response.status === 200) {
                    setMyInfo(response.data);
                } else {
                    console.log("Response status not 200");
                }
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyData();
    }, [])




    let [usernameChangeBtn, setUsernameChangeBtn] = useState(false);
    let [introduceChangeBtn, setIntroduceChangeBtn] = useState(false);

    // username 부분
    let [defaultUsernameInputValue, setDefaultUsernameInputValue] = useState('');
    let [usernameInputValue, setUsernameInputValue] = useState(defaultUsernameInputValue);
    let [finalUsernameInputValue, setFinalUsernameInputValue] = useState('');

    const handleUsernameChange = (event) => {
        setUsernameInputValue(event.target.value);
    }

    const handleFinalUsernameSaveBtn = () => {
        setFinalUsernameInputValue(usernameInputValue);
        setDefaultUsernameInputValue(usernameInputValue);
    }

    // introduce 부분
    let [defaultIntroduceInputValue, setDefaultIntroduceInputValue] = useState('Introduce Yourself')
    let [introduceInputValue, setIntroduceInputValue] = useState(defaultIntroduceInputValue);
    let [finalIntroduceInputValue, setFinalIntroduceInputValue] = useState('');

    const handleIntroduceChange = (event) => {
        setIntroduceInputValue(event.target.value);
    }

    const handleFinalIntroduceSaveBtn = () => {
        setFinalIntroduceInputValue(introduceInputValue);
        setDefaultIntroduceInputValue(introduceInputValue);
    }

    // 성별 부분
    let male = 'male'; let female = 'female'; let unselected = 'unselected';
    let [defaultGender , setDefaultGender] = useState(unselected);
    let [genderValue, setGenderValue] = useState(defaultGender);
    let [finalGender, setFinalGender] = useState('');

    const handleGenderChange = (e) => {
        setDefaultGender(e.target.value);
        setGenderValue(e.target.value);
    };

    const handleGenderSaveBtn = () => {
        setFinalGender(genderValue);
    };

    // 나이 부분
    let teenager = 'teenager'; let twenties = 'twenties'; let thirties = 'thirties'; let overforty = 'overforty'; 
    let [defaultAge, setDefaultAge] = useState(unselected);
    let [ageValue, setAgeValue] = useState(defaultAge);
    let [finalAge, setFinalAge] = useState('');

    const handleAgeChange = (e) => {
        setAgeValue(e.target.value);
        setDefaultAge(e.target.value);
    }

    const handleAgeSaveBtn = () => {
        setFinalAge(ageValue);
    }

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

    // 프로필 사진 부분
    const fileInputRef = useRef(null);
    let [imgURL, setImgURL] = useState(null);
    let [finalImg, setFinalImg] = useState(null);

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

            //   console.log('파일 이름:', file.name);
            //   console.log('파일 크기:', (file.size / 1024).toFixed(2), 'KB');
            //   console.log('파일 타입:', file.type);
            //   console.log('마지막 수정 시간 (타임스탬프):', file.lastModified);
            //   console.log('마지막 수정 시간 (Date 객체):', file.lastModifiedDate);

            // FileReader를 사용하여 파일 내용 읽기
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileInfo = {
                    name: file.name,           // 파일 이름
                    size: file.size,           // 파일 크기
                    type: file.type,           // MIME 타입
                    content: e.target.result,  // 파일 내용 (ArrayBuffer 또는 Base64 등)
                };
                setFinalImg(fileInfo);
            };

            reader.readAsArrayBuffer(file); // 파일 내용을 ArrayBuffer로 읽기
        }
    };

    useEffect(() => {
        const fetchMyModifyData = async () => {
            try {
                const response = await fetch(`${api}/my/modify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: myInfo.unique,
                        image: finalImg,
                        username: finalUsernameInputValue,
                        introduce: finalIntroduceInputValue,
                        gender: finalGender,
                        age: finalAge,
                        range: isOn,
                    })
                });
                if (response.status === 200) {
                    console.log("status 200");
                } else {
                    console.log("Response status not 200");
                }
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyModifyData();
    }, [finalImg, finalUsernameInputValue, finalIntroduceInputValue, finalGender, finalAge, isOn])


    return(
        <body className='my_profile_info-container'>
            <div className='my_profile_info_title_content'>
                <label className='my_profile_info_title'>Profile Manage</label>
            </div>
            <div className='my_profile_info_img_content'>
                {
                    imgURL === null ? (
                        defaultGender === male ? (
                            <IoMdPerson className='my_profile_info_profile_default_male_img'/>
                        ) : (
                            defaultGender === female ? (
                                <IoMdPerson className='my_profile_info_profile_default_female_img'/>
                            ) : (
                                <IoMdPerson className='my_profile_info_profile_default_unselected_img'/>
                            )
                        )
                    ) : (
                        <img src={imgURL} className='my_profile_info_profile_img' />
                    )
                }
                <div className='my_profile_info_img_change_container'>
                    <div>
                        <label className='my_profile_info_username'>{defaultUsernameInputValue}</label>
                    </div>
                    <div className='my_profile_info_img_change-delete_container'>
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
                        <div onClick={() => {setImgURL(null); setFinalImg(null);}} className='my_profile_info_img_delete_content'>
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
                            <input placeholder={defaultUsernameInputValue} onChange={handleUsernameChange} type='text' className='my_profile_info_detail_username_modify_text_container'>
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
                            <input placeholder={defaultIntroduceInputValue} onChange={handleIntroduceChange} type='text' className='my_profile_info_detail_introduce_modify_text_container'>
                            </input>
                        </div>

                        <div className='my_profile_info_detail_introduce_modify_container'>
                            <div onClick={() => {setIntroduceChangeBtn(false); setIntroduceInputValue(defaultIntroduceInputValue)}} className='my_profile_info_detail_introduce_modify_cancel_content'>
                                <label className='my_profile_info_detail_introduce_modify_cancel'>Cancel</label>
                            </div>
                            <div className='my_profile_info_detail_introduce_modify_blank' />
                            <div onClick={() => {setIntroduceChangeBtn(false); handleFinalIntroduceSaveBtn();}} className='my_profile_info_detail_introduce_modify_save_content'>
                                <label className='my_profile_info_detail_introduce_modify_save'>Save</label>
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
                                <label className='my_profile_info_detail_introduce'>{defaultIntroduceInputValue}</label>
                            </div>
                            <div onClick={() => setIntroduceChangeBtn(true)} className='my_profile_info_detail_introduce_change_content'>
                                <label className='my_profile_info_detail_introduce_change'>Change</label>
                            </div>
                        </div>
                        <div className='my_profile_info_detail_introduce_underline'></div>
                    </>
                }

                <div className='my_profile_info_detail_gender_title_content'>
                    <label className='my_profile_info_detail_gender_title'>Gender</label>
                </div>
                <div className='my_profile_info_detail_gender_container'>
                    <div className='my_profile_info_detail_gender_content'>
                        <label className={`my_profile_info_detail_gender_label ${defaultGender === "male" ? "maleSelected" : ""}`}>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleGenderChange}
                                checked={genderValue === male}
                            />
                            Male
                        </label>
                        <div className='my_profile_info_detail_gender_label_blank'></div>
                        <label className={`my_profile_info_detail_gender_label ${defaultGender === "female" ? "femaleSelected" : ""}`}>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleGenderChange}
                                checked={genderValue === female}
                            />
                            Female
                        </label>
                        <div className='my_profile_info_detail_gender_label_blank'></div>
                        <label className={`my_profile_info_detail_gender_label ${defaultGender === "unselected" ? "unselectedSelected" : ""}`}>
                            <input
                                type="radio"
                                name="gender"
                                value="unselected"
                                onChange={handleGenderChange}
                                checked={genderValue === unselected}
                            />
                            Unselected
                        </label>
                    </div>
                    <div onClick={() => handleGenderSaveBtn()} className='my_profile_info_detail_gender_save_content'>
                        <label className='my_profile_info_detail_gender_save'>Save</label>
                    </div>
                </div>
                <div className='my_profile_info_detail_gender_underline'></div>

                <div className='my_profile_info_detail_age_title_content'>
                    <label className='my_profile_info_detail_age_title'>Age</label>
                </div>
                <div className='my_profile_info_detail_age_container'>
                    <div className='my_profile_info_detail_age_content'>
                        <label className={`my_profile_info_detail_age_label ${defaultAge === "teenager" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="age"
                                value="teenager"
                                onChange={handleAgeChange}
                                checked={ageValue === teenager}
                            />
                            Teenager
                        </label>
                        <div className='my_profile_info_detail_age_label_blank'></div>
                        <label className={`my_profile_info_detail_age_label ${defaultAge === "twenties" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="age"
                                value="twenties"
                                onChange={handleAgeChange}
                                checked={ageValue === twenties}
                            />
                            Twenties
                        </label>
                        <div className='my_profile_info_detail_age_label_blank'></div>
                        <label className={`my_profile_info_detail_age_label ${defaultAge === "thirties" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="age"
                                value="thirties"
                                onChange={handleAgeChange}
                                checked={ageValue === thirties}
                            />
                            Thirties
                        </label>
                        <div className='my_profile_info_detail_age_label_blank'></div>
                        <label className={`my_profile_info_detail_age_label ${defaultAge === "overforty" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="age"
                                value="overforty"
                                onChange={handleAgeChange}
                                checked={ageValue === overforty}
                            />
                            Over forty
                        </label>
                        <div className='my_profile_info_detail_age_label_blank'></div>
                        <label className={`my_profile_info_detail_age_label ${defaultAge === "unselected" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="age"
                                value="unselected"
                                onChange={handleAgeChange}
                                checked={ageValue === unselected}
                            />
                            Unselected
                        </label>
                    </div>
                    <div onClick={() => handleAgeSaveBtn()} className='my_profile_info_detail_age_save_content'>
                        <label className='my_profile_info_detail_age_save'>Save</label>
                    </div>
                </div>
                <div className='my_profile_info_detail_age_underline'></div>

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
            </div>
        </body>
    )
}

export default My_profile_info;