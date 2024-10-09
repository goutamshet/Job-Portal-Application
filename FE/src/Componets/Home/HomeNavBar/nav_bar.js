import './nav_bar.css'
import {Link} from 'react-router-dom'

const  NavBar = () => {
    return (
        <div className="nav-container" >
        <div className="home-app-name">
            LocalJobs
        </div>
        <div className="pages-link-container">
            <Link to="/" className="link">
                <div className="home-page-link">
                    Home
                </div>
            </Link>
            <Link to="/" className="link">
                <div className="jobs-page-link">
                    Jobs
                </div>
            </Link>
            <Link to="/jobseeker" className="link">
                <div className="candidates-page-link">
                    Candidates
                </div>
            </Link>
            <Link to="/jobprovider" className="link">
                <div className="recruiter-page-link">
                    Recruiter
                </div>
            </Link>
        </div>
        <div className="signup-login-container">
            <Link to="/login" className="link">
                <div className="login">
                    Login
                </div>
            </Link>
            <Link to="/register" className="link">
                <div className="register">
                    Register
                </div>
            </Link>
        </div>
    </div>
    )
}

export default NavBar