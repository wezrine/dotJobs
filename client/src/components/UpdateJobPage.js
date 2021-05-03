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

    return (
       <UpdateJobList job = {job} />
    )
}

export default UpdateJobPage