import './post_job.css'
import { Link } from 'react-router-dom'

const PostJob = () => {
    return (
        <div className="post-job-form-container">
            <div className="title-button-container">
                <h1 className='title'>Post a Job</h1>
                <div className="buttons-container">
                    <Link className="link" to="/employer">
                        <button className="cancel-button">Cancel</button>
                    </Link>
                    <Link className="link" to="employer">
                        <button className="post-button">Post</button>
                    </Link>
                </div>
            </div>
            <div className='job-details'>
                    <div className="job-details-title">Job Details</div>
                    <div className="row">
                        <label className="label">Company Name </label>
                        <span> : </span>
                        <input className="input company-name" />
                    </div>
                    <div className="row">
                        <label className="label">Job</label>
                        <span> : </span>
                        <input className="input job" />
                    </div>
                    <div className="row">
                        <label className="label desc">Job Description</label>
                        <span> : </span>
                        <textarea className='input job-description'></textarea>
                    </div>
                    <div className="row">
                        <label className="label">Salary</label>
                        <span> : </span>
                        <input className="input job-salary" />
                    </div>
                    <div className="row">
                        <label className="label">Job Type</label>
                        <span> : </span>
                        <input className="input job-type" />
                    </div>
                    <div className="row">
                        <label className="label">Location</label>
                        <span> : </span>
                        <input className="input job-location" />
                    </div>
                    <div className="row">
                        <label className="label">Contact Number</label>
                        <span> : </span>
                        <input className="input contact-no" />
                    </div>
            </div>
        </div>
    )
}

export default PostJob