import { NavLink } from "react-router-dom";
import React from 'react'

function JobList(props) {

    const jobs = props.jobs

    const handleChangeStatus = (e, job) => {

        const status = e.target.value

        let updatedJob = {
            jobId: job,
            status: status
        }

        props.onStatusChange(updatedJob)
    }

    const jobItems = jobs.map((job, index) => {

        const setStatus = (status) => {
            if (status === 'inProgress') {
                return (
                    'is-warning'
                )
            } else if (status === 'complete') {
                return (
                    'is-link'
                )
            } else if (status === 'denied') {
                return (
                    'is-danger'
                )
            } else if (status === 'accepted') {
                return (
                    'is-success'
                )
            } else {
                return (
                    'is-warning'
                )
            }
        }

        return (
            <div key={index} className=" job-container container job is-fluid">
                <div className={`notification ${setStatus(job.status)}`}>
                    <div className="left">
                        <h2><strong>{job.companyTitle}</strong></h2>
                        <p>{job.jobTitle}</p>
                    </div>
                    <div className="right is-flex is-flex-wrap-wrap">
                        <div className="select right-item">
                            <select value={job.status} onChange={(e) => handleChangeStatus(e, job._id)} name="status">
                                <option value="accepted">Accepted</option>
                                <option value="complete">Complete</option>
                                <option value="inProgress">In Progress</option>
                                <option value="denied">Denied</option>
                            </select>
                        </div>
                        <NavLink to={`/details/${job._id}`} className="right-item button is-light">Details</NavLink>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {jobItems}
        </div>
    )
}

export default JobList