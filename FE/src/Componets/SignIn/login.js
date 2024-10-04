
import { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login-container" >
            <form className="card" onSubmit={handleSubmit}>
                <h1 className="login-title">Log In</h1>
                <div className="input-container">
                    <input type="email" placeholder="Email" className="login-input" required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    <input type="password" placeholder="Password" className="login-input" required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    />
                </div>
                <div className="forgot-password">Forgot password?</div>
                <button className="login-button">Log In</button>
                <div className="account-links">
                    <span className="text">Don't have an account? &nbsp;</span> 
                    <Link className="signup-link" to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login