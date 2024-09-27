import './../css/header.css';
import { RiSettings4Fill } from "react-icons/ri";
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    
    let [categoryBtn, setCategoryBtn] = useState("chat");
    let [loginBtn, setLoginBtn] = useState(false);
    let [signupBtn, setSignupBtn] = useState(false);
    let [mainBtn, setMainBtn] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if(loginBtn) {
            navigate("/login");
        }
        else if(signupBtn) {
            navigate("/signup");
        }
        else if(mainBtn) {
            navigate("/");
        }
    }, [loginBtn, signupBtn, mainBtn])

    return(
        <header style={{width:"100%", height:"170px", backgroundColor:"#3578FF", display:"flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{display:"flex", paddingTop:"10px", height:"80px"}}>
                <div style={{width:"400px"}}>
                    <div style={{width:"40px", display:"flex", justifyContent:"flex-end"}}>
                        <RiSettings4Fill style={{color:"#D9E8FF", fontSize:"27px", marginTop:"6px"}} />
                    </div>
                </div>
                <div onClick={() => setMainBtn(true)} style={{width:"480px", textAlign:"center", color:"white", marginTop:"6px", fontSize:"24px", fontWeight:"bold", cursor:"pointer"}}>
                    RandomChat & RandomVideo
                </div>
                <div style={{width:"400px", display:"flex", justifyContent: "flex-end"}}>
                    <div onClick={() => setLoginBtn(true)} className='login-signup_Btn' >
                        Login
                    </div>
                    <div style={{width:"20px"}}></div>
                    <div onClick={() => setSignupBtn(true)} className='login-signup_Btn' >
                        SignUp
                    </div>
                    <div style={{width:"20px"}}></div>
                    <div style={{width:"50px"}}>
                        <MdPeople style={{color:"#D9E8FF", fontSize:"27px", marginTop:"6px"}} />
                    </div>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div onClick={() => setCategoryBtn("chat")} 
                    style={{width:"620px", borderRadius:"20px", height:"30px", backgroundColor: categoryBtn === "chat" ? "white" : "#3578FF", color: categoryBtn === "chat" ? "#3578FF" : "white", marginLeft:"20px", display:"flex", justifyContent:"center", cursor:"pointer"}}>
                        RandomChat
                </div>
                <div style={{width:"20px"}}></div>
                <div onClick={() => setCategoryBtn("video")} 
                    style={{width:"620px", borderRadius:"20px", height:"30px", backgroundColor: categoryBtn === "video" ? "white" : "#3578FF", color: categoryBtn === "video" ? "#3578FF" : "white", marginRight:"20px", display:"flex", justifyContent:"center", cursor:"pointer"}}>
                        RandomVideo
                </div>
            </div>
        </header>
    )
}

export default Header;