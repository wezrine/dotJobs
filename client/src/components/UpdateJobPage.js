import React, { useState, useEffect } from 'react'
import UpdateJobList from './UpdateJobList'

function UpdateJobPage ({ match }) {

    const id = match.params.jobId
    const [job, setJob] = useState([])

    useEffect (() => {
        getJob()
    },[])

    const getJob = () => {
        fetch(`http://localhost:8080/details/${id}`)
        .then(response => response.json())
        .then(job => {
            console.log(job)
            setJob(job)
        })
    }

    const updateJob = (updatedJob) => {
        fetch('http://localhost:8080/jobs', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedJob)
        }).then(() => {
            window.location.replace(`/details/${updatedJob.jobId}`)
        })
    }

    return (
       <UpdateJobList job = {job} onUpdateJob = {updateJob} />
    )
}

export default UpdateJobPage