import React, { useState } from 'react'

function AddJobPage() {


    const [job, setJob] = useState({})

    const handleOnChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        })
    }

    const handleAddJob = () => {
        fetch('http://localhost:8080/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(job)
        }).then(window.location.replace('/jobs'))
    }

    return (
        <div>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-6">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile add-job is-child notification is-title">
                                <p className="title">Job</p>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Company Name' name='companyTitle'/>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Job Title' name='jobTitle' />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Company URL' name='companyURL'/>
                            </article>
                            <article className="tile  add-job is-child notification is-link">
                                <p className="title">Contact</p>
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Contact Name' name='contactName' />
                                <input onChange={handleOnChange} className='input' type='text' placeholder='Contact Role' name='contactRole' />
                                <input onChange={handleOnChange} className='input' type='tel' placeholder='Contact Phone' name='contactPhone' />
                                <input onChange={handleOnChange} className='input' type='email' placeholder='Contact Email' name='contactEmail' />
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile  add-job is-child notification is-dark">
                        <div className="content">
                            <p className="title">Description</p>
                            <input onChange={handleOnChange} className='input' type='url' placeholder='Job URL' name='jobURL' />
                            <div className="content">
                                <article className="message description">
                                    <textarea onChange={handleOnChange} className="message-body" name='jobDescription'></textarea>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="row has-text-centered">
                <button onClick={handleAddJob} className="button is-link">Add Job</button>
            </div>

        </div>

    )
}

export default AddJobPage