import { useState } from 'react'
import './sub_menu.css'
import profile from '../../../../Assets/account.png'
import logout from '../../../../Assets/logout.png'
import { Link } from 'react-router-dom'

const SubMenu = ({isVisible}) => {

    if(!isVisible){
        return null;
    }
    return (
        <div className="sub-menu-container">
            <div className="edit-profile-container">
                <div className="menu-icon-container"><img src={profile} className="menu-icon"/></div>
                <div className="edit-profile">Profile</div>
            </div>
            <div className="edit-profile-container">
                <div className="menu-icon-container"><img src={logout} className="menu-icon"/></div>
                <Link to="/signin" className='logout-link'>
                    <div className="logout">Logout</div>
                </Link>
            </div>
        </div>
    )
}

export default SubMenu