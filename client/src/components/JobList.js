import { NavLink } from "react-router-dom";

function JobList (props) {

    const jobs = props.jobs



    const jobItems = jobs.map((job, index) => {

        const setStatus = (status) => {
            if (status === 'inProgress') {
                return (
                    'is-warning'
                )
            } else if (status === 'complete'){
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
                        <NavLink to  = {`/details/${job._id}`} className="button is-light">Details</NavLink>
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