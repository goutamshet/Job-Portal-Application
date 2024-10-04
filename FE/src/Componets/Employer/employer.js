import NavBar from "./EmployerNavBar/employer_nav_bar"
import SubMenu from "./EmployerNavBar/SubMenu/sub_menu"
import EmployerMainSection from "./MainSection/main"

const Employer = () => {
    return (
        <div className="employer-container">
            <NavBar/>
            <EmployerMainSection/>
        </div>
    )
}

export default Employer