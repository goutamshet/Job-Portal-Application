
import MainSection from "./MainSection/main"
import NavBar from "./HomeNavBar/nav_bar"
import SearchButton from "./SearchButton/search_button"

import './home.css'

const Home= () => {
    return (
        <div className="home">
            <NavBar/>
            <MainSection/>
            <SearchButton />
        </div>
    )
}

export default Home