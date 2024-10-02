import './../css/footer.css';

const Footer = () => {
    return(
        <footer className='footer_container'>
            <div className='footer_content'>
                <div>
                    고객센터 <label style={{fontWeight:"bold"}}>1234-1234</label>&nbsp;
                    <label style={{color:"rgba(255,255,255,0.5)"}}>(평일 09:00~18:00/무료) | </label>  
                    금융사고 전담 <label style={{fontWeight:"bold"}}>1234-1234</label> 
                    <label style={{color:"rgba(255,255,255,0.5)"}}> | 서울특별시 도붕구 해등로 242-11, 5층 (평일 09:00~18:00)</label>
                </div>
                <div className='footer_1'>
                    <label style={{color:"rgba(255,255,255,0.5)"}}>이태영 (주) | 서울특별시 도붕구 해등로 242-11, 5층 | 대표 이태영 | 사업자등록번호 123-12-12345 | 가상자산사업자 등록번호 1234-12 | 기사 배열 책임자 이태영</label>
                </div>
                <div className='footer_2'>
                    {/* <label style={{color:"rgba(255,255,255,0.5)"}}>*가상자산은 고위험 상품으로써 투자금의 전부 또는 일부 손실을 초래 할 수 있습니다.</label> */}
                </div>
                <div className='footer_3'>
                    <label style={{color:"rgba(255,255,255,0.5)"}}>Copyright © 2017 - 2024 Lee Inc. All rights reserved.</label>
                </div>
            </div>
        </footer>
    )
}

export default Footer;