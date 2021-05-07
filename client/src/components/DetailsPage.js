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
        fetch(`http://localhost:8080/details/${id}`)
        .then(response => response.json())
        .then(job => {
            setJob(job)
            setTasks(job.tasks)
            setFiles(job.files)
        })
    }

    const addTask = (newTask) => {
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

    const deleteTask = (task) => {
        fetch(`http://localhost:8080/tasks/${task.jobId}/${task.taskId}`, {
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
        fetch(`http://localhost:8080/jobs/${jobId}`, {
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
        fetch(`http://localhost:8080/tasks/${updatedTask.jobId}/${updatedTask.taskId}`, {
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

        fetch(`http://localhost:8080/files/${jobId}`, {
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
        fetch(`http://localhost:8080/files/${file.jobId}/${file.fileId}`, {
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