import './../css/login_info.css';

const Login_info = () => {
    return(
        <body style={{width:"1280px", margin:"auto", height:"500px", backgroundColor:"#f4f4f4"}}>
            <div>
                <input placeholder='Email' style={{width:"1200px", height:"40px", border:"none", borderRadius:"10px", margin:"20px 0px 0px 40px"}}></input>
            </div>  
            <div>
                <input placeholder='Password' style={{width:"1200px", height:"40px", border:"none", borderRadius:"10px", margin:"20px 0px 0px 40px"}}></input>
            </div>  
            <div style={{width:"1240px"}}>
                <div style={{width:"150px", textAlign:"right", color:"#91929F"}}>
                    Forgot password
                </div>
            </div>
        </body>
    )
}

export default Login_info;