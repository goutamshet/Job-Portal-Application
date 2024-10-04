import JobInfoCard from "./JobInfoCard/seeker_job_info_card"
import './seeker_main.css'
const SeekerMainSection = () => {
    return(
        <div className="main">
            <JobInfoCard/>
            <JobInfoCard/>
            <JobInfoCard/>
            <JobInfoCard/>
            <JobInfoCard/>
            <JobInfoCard/>
        </div>
    )
}

export default SeekerMainSection