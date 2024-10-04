import Banner from '../../../Assets/home_banner.jpg'
import './main.css'

const HomeMainSection = () => {
    return (
        <div className="home-main-container">
            <div className="main-title-container">
                <div className="main-title">
                    Find the Perfect Job Right Here in Your City
                </div>
                <div className="main-subtitle">
                    Browse hundreds of local job opportunities and start your career close to home. Your future is just around the corner!
                </div>
            </div>
            <div className="main-image-container">
                <img src={Banner} className="main-image"/>
            </div>
        </div>
    )
}

export default HomeMainSection