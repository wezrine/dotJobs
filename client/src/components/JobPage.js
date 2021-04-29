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

    return (
      <JobList jobs = {jobs} />
    )
}

export default JobPage