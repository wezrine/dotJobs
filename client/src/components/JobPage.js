import React, { useState, useEffect } from 'react'
import JobList from './JobList'

function JobPage() {

    const [jobs, setJobs] = useState([])

    useEffect (() => {
        getAllJobs()
    },[])

    const getAllJobs = () => {
        fetch('http://localhost:8080/jobs')
        .then(response => response.json())
        .then(jobs => {
            console.log(jobs)
            setJobs(jobs)
        })
    }

    const updateStatus = (updatedJob) => {
        fetch('http://localhost:8080/jobs', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedJob)
            }).then(() => {
                getAllJobs()
            })
    }

    return (
      <JobList jobs = {jobs} onStatusChange = {updateStatus}/>
    )
}

export default JobPage