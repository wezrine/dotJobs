import React, { useState, useEffect } from 'react'

function UpdateJobList(props) {

    const job = props.job
    
    const [updatedJob, setUpdatedJob] = useState({})

    const handleOnChange = (e) => {
        setUpdatedJob({
            ...updatedJob,
            [e.target.name]: e.target.value
        })
    }

    useEffect (() => {
        setUpdatedJob({...props.job})
    },[])
    
    const handleSubmit = (jobId) => {

        let job = {
            jobId: jobId,
            updatedJob: {
                ...props.job,
                ...updatedJob
            }
        }

        props.onUpdateJob(job)
    }


    return (
        <div>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-light is-black">
                                <p className="title">Job</p>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Company Name' name='companyTitle' defaultValue={job.companyTitle} />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Job Title' name='jobTitle' defaultValue={job.jobTitle} />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Company URL' name='companyURL' defaultValue={job.companyURL} />
                            </article>
                            <article className="tile is-child notification is-info">
                                <p className="title">Contact</p>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Contact Name' name='contactName' defaultValue={job.contactName} />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Contact Role' name='contactRole' defaultValue={job.contactRole} />
                                <input onChange={handleOnChange} className='input' type='tel' placeholder='Contact Phone' name='contactPhone' defaultValue={job.contactPhone} />
                                <input onChange={handleOnChange} className='input' type='email' placeholder='Contact Email' name='contactEmail' defaultValue={job.contactEmail} />
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-dark">
                        <div className="content">
                            <p className="title">Description</p>
                            <input onChange={handleOnChange} className='input' type='url' placeholder='Job URL' name='jobURL' defaultValue={job.jobURL} />
                            <div className="content">
                                <article className="message description">
                                    <textarea onChange={handleOnChange} className="message-body" name="jobDescription" defaultValue={job.jobDescription}></textarea>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="row has-text-centered">
                <button onClick={() => handleSubmit(job._id)} className="button is-primary">Update Job</button>
            </div>
        </div>
    )
}

export default UpdateJobList