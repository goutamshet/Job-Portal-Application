import './employer_nav_bar.css'
import {Link} from 'react-router-dom'
import profile from '../../../Assets/account.png'
import SubMenu from './SubMenu/sub_menu'
import { useState } from 'react'


const  NavBar = () => {
    const[subMenuVisible,setSubMenuVisible] = useState(false);

    const handleSubMenuVisibility = () => {
        setSubMenuVisible((prev) => !prev)
    }    

    return (
        <div className="nav-container" >
            <div className="app-name">
                LocalJobs
            </div>
            <div className="nav-items-container">
                {/* <Link to="/post-job" className="link">
                    <div className='job-posts'>Job Posts</div>
                </Link>
                <Link to="/post-job" className="link">
                    <div className='candidates'>Candidates</div>
                </Link> */}
                <Link to="/post-job" className="link">
                    <div className="button-post-job">
                        Post Job
                    </div>
                </Link>
                <div className="profile-container" onClick={handleSubMenuVisibility}>
                    <span className="account-type">Employer</span>
                    <img  className="profile" src={profile}/>
                </div>
            </div>
            <SubMenu isVisible={subMenuVisible}/>
    </div>
    )
}

export default NavBar