import React from 'react'
import { loginEndpoint } from '../spotify'
import '../styles/login.css'

function Login() {
    return (
        <div className="login-page">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="logo-spotify" className="logo" />
            <a href={loginEndpoint}><div className="login-btn">Log in</div></a>
        </div>
    )
}

export default Login