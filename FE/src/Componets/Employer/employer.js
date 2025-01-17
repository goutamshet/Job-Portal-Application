import NavBar from "./EmployerNavBar/employer_nav_bar"
import SubMenu from "../SubMenu/sub_menu"
import EmployerMainSection from "./MainSection/main"

const Employer = () => {
    const token = localStorage.getItem('token')

    return (
        <>
        {token && 
        <div className="employer-container">
            <NavBar/>
            <EmployerMainSection/>
        </div>}
        </>
    )
}

export default Employer