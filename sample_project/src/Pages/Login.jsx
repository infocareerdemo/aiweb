import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../components/Appprovider";

const Login = () => {
    const navigate = useNavigate()
    const { postApi, updateToken, sessionStatus, updateSessionStatus } = useAppContext()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (sessionStatus == 403) {
            alert("Session Expried")
            updateSessionStatus("")
        }
    }, [])

    const handleLogin = () => {
        if (userName.trim() == "") {
            alert("Enter the username")
        }
        else if (password == "") {
            alert("Enter the password")
        }
        else {
            var url = "user/login"
            var data = {
                "username": userName,
                "password": password
            }
            postApi(url, data).then((response) => {
                if (response.data && response.headers.authorization) {
                    localStorage.setItem("token", response.headers.authorization)
                    updateToken(response.headers.authorization)
                    navigate("/home")
                }
            })
                .catch((error) => {
                    console.log("Error :", error)
                })
        }
    }
    return (
        <div className='main-container'>
            <div className='login-container'>
                <h2>Login</h2>
                <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter Username'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='forgot-password-link'>
                        <a onClick={() => navigate('/forgotpassword')}>
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <div className='input-group input '>
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                </div>
                <div className='register-link'>
                    <p>Don't have an account? <a onClick={() => navigate('/register')}>Register</a></p>
                </div>
            </div>
        </div>
    )
}


export default Login;