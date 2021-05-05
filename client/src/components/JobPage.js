import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate'
import JobList from './JobList'

function JobPage() {

    const [jobs, setJobs] = useState([])

    useEffect (() => {
        getAllJobs()
    },[])

    const getAllJobs = () => {

        // const token = localStorage.getItem('jsonwebtoken')

        // fetch('http://localhost:8080/jobs', {
        //     method: 'GET', 
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        // .then(response => response.json())
        // .then(jobs => {
        //     console.log(jobs)
        //     setJobs(jobs)
        // })

        // axios.get('http://localhost:8080/jobs')
        // .then(response => {
        //     console.log(response.data)
        // })

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