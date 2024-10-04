import './nav_bar.css'
import {Link} from 'react-router-dom'

const  NavBar = () => {
    return (
        <div className="nav-container" >
        <div className="app-name">
            LocalJobs
        </div>
        <div className="signup-login-container">
            <Link to="/signin" className="link">
                <div className="login">
                    Login
                </div>
            </Link>
            <Link to="/signup" className="link">
                <div className="sign-up">
                    Sign Up
                </div>
            </Link>
        </div>
    </div>
    )
}

export default NavBar