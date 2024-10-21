import { useState } from 'react'
import './sub_menu.css'
import profile from '../../../../Assets/account.png'
import logout from '../../../../Assets/logout.png'
import { Link, useNavigate } from 'react-router-dom'


const SubMenu = ({isVisible}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
    
        // Optionally, clear any other user-related data
        localStorage.removeItem('role'); // if you are storing user role
    
        // Redirect to the login page
        navigate('/login');
      };

    if(!isVisible){
        return null;
    }
    return (
        <div className="sub-menu-container">
            <div className="edit-profile-container">
                <div className="menu-icon-container"><img src={profile} className="menu-icon"/></div>
                <Link to="/employer-profile" className='logout-link'>
                <div className="employer-profile">Profile</div>
                </Link>
            </div>
            <div className="edit-profile-container">
                <div className="menu-icon-container"><img src={logout} className="menu-icon"/></div>
                <Link to="/login" className='logout-link'>
                    <div className="logout" onClick={handleLogout}>Logout</div>
                </Link>
            </div>
        </div>
    )
}

export default SubMenu