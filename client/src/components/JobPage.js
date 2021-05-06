import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobList from './JobList'

function JobPage() {

    const [jobs, setJobs] = useState([])

    useEffect (() => {
        getAllJobs()
    },[])

    const getAllJobs = () => {


        axios.get('http://localhost:8080/jobs')
        .then(response => {
            if(response.data.error) {
                console.log(response.data.error)
            } else {

                setJobs(response.data)
            }
        })
    }

    const updateStatus = (updatedJob) => {
        console.log(updatedJob)
        fetch('http://localhost:8080/status', {
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