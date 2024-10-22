import './employer_nav_bar.css'
import {Link} from 'react-router-dom'
import account from '../../../Assets/account.png'
import SubMenu from '../../SubMenu/sub_menu'
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
                <Link to="/post-job" className="link">
                    <div className="button-post-job">
                        Post Job
                    </div>
                </Link>
                <div className="account-container" onClick={handleSubMenuVisibility}>
                    <span className="account-type">Employer</span>
                    <img  className="account" src={account}/>
                </div>
            </div>
            <SubMenu isVisible={subMenuVisible}/>
    </div>
    )
}

export default NavBar