import React, { useState, useEffect } from 'react'
import UpdateJobList from './UpdateJobList'
import { useHistory } from "react-router-dom";

function UpdateJobPage ({ match }) {

    let history = useHistory()

    const id = match.params.jobId
    const [job, setJob] = useState([])

    useEffect (() => {
        getJob()
    },[])

    const getJob = () => {
        fetch(`https://dotjobs.herokuapp.com/details/${id}`)
        .then(response => response.json())
        .then(job => {
            console.log(job)
            setJob(job)
        })
    }

    const updateJob = (updatedJob) => {
        fetch('https://dotjobs.herokuapp.com/jobs', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedJob)
        }).then(() => {
            history.push(`/details/${updatedJob.jobId}`)
        })
    }

    return (
       <UpdateJobList job = {job} onUpdateJob = {updateJob} />
    )
}

export default UpdateJobPage