import React, { useState, useEffect } from 'react'
import DetailsList from './DetailsList'

function DetailsPage({ match }) {

    const id = match.params.jobId

    const [job, setJob] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect (() => {
        getJob()
    },[])

    const getJob = () => {
        fetch(`http://localhost:8080/details/${id}`)
        .then(response => response.json())
        .then(job => {
            console.log(job)
            setJob(job)
            setTasks(job.tasks)
        })
    }

    const addTask = (newTask) => {
        console.log('added task')
        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }).then(() => {
            getJob()
        })
    }

    return ( 
        <DetailsList job = {job} tasks = {tasks} onNewTask = {addTask}/>
    )
}

export default DetailsPage