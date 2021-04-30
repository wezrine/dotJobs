import { NavLink } from "react-router-dom";
import React, { useState } from 'react'

function JobList(props) {

    const jobs = props.jobs

    const handleChangeStatus = (e, job) => {

        const status = e.target.value
        console.log(job)

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
            <div key={index} className="container job is-fluid">
                <div className={`notification ${setStatus(job.status)}`}>
                    <div className="left">
                        <div className="job-label">
                            <h2><strong>{job.companyTitle}</strong></h2>
                            <p>{job.jobTitle}</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="select">
                            <select value={job.status} onChange={(e) => handleChangeStatus(e, job._id)} name="status">
                                <option value="accepted">Accepted</option>
                                <option value="complete">Complete</option>
                                <option value="inProgress">In Progress</option>
                                <option value="denied">Denied</option>
                            </select>
                        </div>
                        <NavLink to={`/details/${job._id}`} className="button is-light">Details</NavLink>
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