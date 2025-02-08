import './../css/main_video.css';
import React from 'react';

const Main_video = () => {
    
    return(
        // <div style={{width:"100%", height:"100%", backgroundColor:"red"}}>
            <body className='video_container' style={{width:"1280px", height:"800px", margin:"auto", pointerEvents:"none"}}>
                <video className='video_content' controls autoPlay loop muted style={{ width: "1280px", height: "790px" }}>
                    <source src={`${process.env.PUBLIC_URL}/video/video2.mp4`} />
                </video>
            </body>
        // </div>
    )
}

export default Main_video;