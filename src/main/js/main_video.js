import './../css/main_video.css';
import React, { useContext } from 'react';
import { MyContext } from './../../App'; // Context 가져오기

const Main_video = () => {
    const { api } = useContext(MyContext);
    
    return(
        <>
        </>
        // <body className='video_container' style={{width:"1280px", maxWidth:"1440px", height:"800px", margin:"auto"}}>
        //     <video className='video_content' controls autoPlay loop muted style={{ width: "1200px", height: "790px" }}>
        //         <source src={`${process.env.PUBLIC_URL}/video/video2.mp4`} />
        //         Your browser does not support the video tag.
        //     </video>
        // </body>
    )
}

export default Main_video;