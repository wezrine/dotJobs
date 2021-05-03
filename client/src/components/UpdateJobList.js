

function UpdateJobList(props) {

    const job = props.job

    return (
        <div>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-light is-black">
                                <p className="title">Job</p>
                                <input className='input' type='text' placeholder='Company Name' name='companyTitle' value={job.companyTitle} />
                                <input className='input' type='text' placeholder='Job Title' name='jobTitle' value={job.jobTitle} />
                                <input className='input' type='text' placeholder='Company URL' name='companyURL' value={job.companyURL} />
                            </article>
                            <article className="tile is-child notification is-info">
                                <p className="title">Contact</p>
                                <input className='input' type='text' placeholder='Contact Name' name='contactName' value={job.contactName} />
                                <input className='input' type='text' placeholder='Contact Role' name='contactRole' value={job.contactRole} />
                                <input className='input' type='tel' placeholder='Contact Phone' name='contactPhone' value={job.contactPhone} />
                                <input className='input' type='email' placeholder='Contact Email' name='contactEmail' value={job.contactEmail} />
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-dark">
                        <div className="content">
                            <p className="title">Description</p>
                            <input className='input' type='url' placeholder='Job URL' name='jobURL' value={job.jobURL} />
                            <div className="content">
                                <article className="message description">
                                    <textarea className="message-body" value={job.jobDescription}></textarea>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="row has-text-centered">
                <button className="button is-primary">Update Job</button>
            </div>
        </div>
    )
}

export default UpdateJobList