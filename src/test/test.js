import React, { useRef, useState } from 'react';

const Test = () => {
  const fileInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 후 미리보기 URL 생성 및 파일 정보 콘솔 출력
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 파일 URL 생성
      const imageURL = URL.createObjectURL(file);
      setPreviewURL(imageURL); // 이미지 미리보기 URL 상태로 저장

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

  return (
    <div>
      {/* 파일 선택 버튼 */}
      <button onClick={handleButtonClick}>사진 선택</button>

      {/* 숨겨진 파일 입력 요소 */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* 선택한 이미지 미리보기 */}
      {previewURL && (
        <div>
          <img src={previewURL} alt="미리보기" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
};

export default Test;
