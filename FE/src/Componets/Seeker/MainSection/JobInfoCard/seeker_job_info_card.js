import './seeker_job_info_card.css'
import edit from '../../../../Assets/edit.png'
import remove from '../../../../Assets/trash-can.png'
import companyicon from '../../../../Assets/company.png'
import work from '../../../../Assets/work.png'
import jobDescription from '../../../../Assets/job-description.png'
import salary from '../../../../Assets/payroll.png'
import jobtype from '../../../../Assets/job-type.png'
import location from '../../../../Assets/location.png'
import phone from '../../../../Assets/phone.png'
const JobInfoCard  = () => {
    return(
        <div className="job-info-card-container">
            {/* <div className='company-details-container'>
                <img className="company-icon" src={companyicon}/>
                <div className="company-name pd">
                    Company : Om Tours and Travels
                </div>
            </div>
            <div className="job-title pd">
                    Job : Driver
                </div>
            <div className="job-description pd">
                Description : Needed Drivers for car who can travel long distance
            </div>
            <div className="job-salary pd">
                Salary : Rs. 2000/travel
            </div>
            <div className="job-type pd">
                Job Type : Part Time Jobs
            </div>
            <div className="job-location pd">
                Location : Bengaluru
            </div>
            <div className="contact-no pd">
                Contact No : 9784548484
            </div> */}
            <div className="date-edit-container">
                <div className="post-date">
                    Posted On : 30-09-2024
                </div>
                <div className="edit-icon-container">
                    <img className="edit-icon" src={edit}/>
                </div>
                <div className="remove-icon-container">
                    <img className="remove-icon" src={remove}/>
                </div>
            </div>
            <div className="company-details-container">
                <img className="icon" src={companyicon}/>
                <div className="company-name">Om Tours and Travels</div>
            </div>
            <div className="company-details-container">
                <img className="icon" src={work}/>
                <div className="job-title">Driver</div>
            </div>
            <div className="company-details-container">
                <img className="icon" src={jobDescription}/>
                <div className="job-desc">Wanted Experienced Driver to travel long distance at any time</div>
            </div>
            <div className="company-details-container">
                <img className="icon" src={salary}/>
                <div className="job-salary">Rs. 2000 per travel</div>
            </div>
            <div className="company-details-container">
            <img className="icon" src={jobtype}/>
            <div className="job-type">Full Time</div>
            </div>
            <div className="company-details-container">
            <img className="icon" src={location}/>
            <div className="job-salary">All Karnataka</div>
            </div>
            <div className="company-details-container">
            <img className="icon" src={phone}/>
            <div className="contact-no">9876451536</div> 
            </div>
            {/* <table>
                <tr>
                    <th className="table-heading"></th>
                    <td className="table-data company-name"></td>
                </tr>
                <tr>
                    <th className="table-heading"><img className="icon" src={work}/></th>
                    <td className="table-data job-title">Driver</td>
                </tr>
                <tr>
                    <th className="table-heading"><img className="icon" src={description}/></th>
                    <td className="table-data job-description">Wanted Experienced Driver to travel long distance at any time</td>
                </tr>
                <tr>
                    <th className="table-heading"><img className="icon" src={salary}/></th>
                    <td className="table-data job-salary">2000/travel</td>
                </tr>
            </table> */}
        </div>
    )
}

export default JobInfoCard
