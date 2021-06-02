import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import DetailsList from './DetailsList'

function DetailsPage({ match }) {

    let history = useHistory()

    const id = match.params.jobId

    const [job, setJob] = useState([])
    const [tasks, setTasks] = useState([])
    const [files, setFiles] = useState([])

    useEffect (() => {
        getJob()
    },[])

    const getJob = () => {
        fetch(`https://dotjobs.herokuapp.com/details/${id}`)
        .then(response => response.json())
        .then(job => {
            setJob(job)
            setTasks(job.tasks)
            setFiles(job.files)
        })
    }

    const addTask = (newTask) => {
        fetch('https://dotjobs.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }).then(() => {
            getJob()
        })
    }

    const deleteTask = (task) => {
        fetch(`https://dotjobs.herokuapp.com/tasks/${task.jobId}/${task.taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(result => {
            getJob()
        })
    }

    const deleteJob = (jobId) => {
        fetch(`https://dotjobs.herokuapp.com/jobs/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            history.push('/jobs')
        })
    }

    const changeTaskStatus = (updatedTask) => {
        let updatedStatus = {
            updatedStatus: updatedTask.isCompleted
        }
        fetch(`https://dotjobs.herokuapp.com/tasks/${updatedTask.jobId}/${updatedTask.taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStatus)
        }).then((response) => response.json())
        .then(result => {
            getJob()
        })
    }

    const uploadFile = (filePackage) => {
        const jobId = filePackage.jobId
        const file = filePackage.file

        fetch(`https://dotjobs.herokuapp.com/files/${jobId}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multi-part/form-data'
            },
            body: file
        }).then((response) => response.json())
        .then(result => {
            getJob()
        })
    }

    const deleteFile = (file) => {
        fetch(`https://dotjobs.herokuapp.com/files/${file.jobId}/${file.fileId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then(result => {
            getJob()
        })
    }
    return ( 
        <DetailsList job = {job} tasks = {tasks} files = {files} onNewTask = {addTask} onFileUpload = {uploadFile} onDeleteFile = {deleteFile} onDeleteTask = {deleteTask} onCheck = {changeTaskStatus} onDeleteJob = {deleteJob}/>
    )
}

export default DetailsPage