import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

function DetailsList(props) {

    const job = props.job
    const tasks = props.tasks
    const files = props.files

    const [task, setTask] = useState({ taskItem: '' }) // This is a new 'task'
    const [isModalActive, setisModalActive] = useState(false)

    const fileItems = files.map((file, index) => {

        const handleDeleteFile = () => {
            let deletedFile = {
                jobId: job._id,
                fileId: file._id
            }
            props.onDeleteFile(deletedFile)
        }

        return (
            <li key={index} className="file-row">
                <i className="fas file fa-file"></i>
                <a href={`https://dotjobs.herokuapp.com/uploads/${file.fileURL}`} target="_blank">{file.fileName}</a>
                <i onClick={handleDeleteFile} className="fas fa-minus-circle"></i>
            </li>
        )
    })

    const taskItems = tasks.map((task, index) => {

        const handleCheck = (jobId, isCompleted) => {
            let updatedTask = {
                jobId: jobId,
                taskId: task._id,
                isCompleted: !isCompleted
            }
            props.onCheck(updatedTask)
        }

        const handleDeleteTask = () => {
            let deletedTask = {
                jobId: job._id,
                taskId: task._id
            }
            console.log(deletedTask)
            props.onDeleteTask(deletedTask)
        }

        return (
            <li className="item is-flex is-align-items-center" key={index}>
                <input onClick={() => handleCheck(job._id, task.isCompleted)} type="checkbox" defaultChecked={task.isCompleted} />
                <p>{task.taskItem}</p>
                <i onClick={() => handleDeleteTask()} className="fas task-delete fa-minus-circle"></i>
            </li>
        )
    })

    const handleOnChange = (e) => {
        setTask({
            ...task,
            jobId: job._id,
            [e.target.name]: e.target.value
        })
    }

    const handleAddTask = () => {
        if (task.taskItem === '') {
            alert('Please enter task value')
        } else {
            let newTask = { task }
            props.onNewTask(newTask)
        }
        const checklistInput = document.getElementById('checklistInput')
        checklistInput.value = ''
    }

    const openModal = () => {
        setisModalActive(true)
    }

    const closeModal = () => {
        setisModalActive(false)
    }

    const handleDelete = (jobId) => {
        props.onDeleteJob(jobId)
    }

    const handleFileUpload = (e, jobId) => {
        console.log(jobId)
        let selected = e.target.files[0]
        var file = new FormData()
        file.append('file', selected)
        let filePackage = {
            jobId: jobId,
            file: file
        }
        props.onFileUpload(filePackage)
    }

    return (
        <div className="tile-page tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-light is-flex is-flex-direction-column">
                            <p className="title">{job.companyTitle}</p>
                            <p className="subtitle">{job.jobTitle}</p>
                            <a className="subtitle website" href={job.companyURL} target="_blank" rel="noreferrer">Website</a>
                            <div className="details select">
                                <select value={job.status}>
                                    <option value='accepted'>Accepted</option>
                                    <option value='complete'>Completed</option>
                                    <option value='inProgress'>In Progress</option>
                                    <option value='denied'>Denied</option>
                                </select>
                            </div>
                            <div className='controls is-flex'>
                                <span onClick={openModal} className="tag is-danger is-medium">Delete</span>
                                <NavLink to={`/update-job/${job._id}`}><span className="navbar-item tag is-danger is-medium">Update</span></NavLink>
                            </div>
                        </article>
                        <article className="tile is-child notification is-link">
                            <p className="title">Contact</p>
                            <p className="subtitle">{job.contactName}</p>
                            <p>{job.contactRole}</p>
                            <p>{job.contactPhone}</p>
                            <p>{job.contactEmail}</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-warning">
                            <p className="title">Files</p>
                            <div className='row is-flex upload-row'>
                                <div className="file is-link is-small">
                                    <label className="file-label">
                                    {/* onChange={(e) => handleFileUpload(e, job._id)} */}
                                        <input  name="files" className="file-input" type="file" accept='.pdf' name="resume" />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                </span>
                                                <span className="file-label">Upload a PDF</span>
                                            </span>
                                    </label>
                                </div>
                            </div>
                                <ul>
                                    {fileItems ? fileItems : <h3>Loading...</h3>}
                                </ul>
                        </article>
                    </div>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                            <p className="title">Checklist</p>
                            <div className="content checklist">
                                <ul>
                                    {taskItems ? taskItems : <h3>Loading...</h3>}
                                </ul>
                                <div className="is-flex-direction-row checklist-input">
                                    <input onChange={handleOnChange} name="taskItem" id='checklistInput' className="input" type="text" placeholder="Add a task" />
                                    <button onClick={handleAddTask} className="button is-dark" >Add</button>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-dark">
                        <div className="content">
                            <p className="title">Description</p>
                            <a className="subtitle job-posting" href={job.jobURL} target="_blank" rel="noreferrer">Job Posting</a>
                            <div className="content">
                                <article className="message description">
                                    <textarea className="message-body" value={job.jobDescription} disabled></textarea>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
                <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title has-text-centered">Warning!</p>
                        </header>
                        <section className="modal-card-body has-text-centered">
                            <h2>Are you sure you want to delete your application for {job.jobTitle} at {job.companyTitle}?</h2><br />
                            <h3><strong>This is a process that cannot be reversed!</strong></h3>
                        </section>
                        <footer className="modal-card-foot is-justify-content-center">
                            <button onClick={() => handleDelete(job._id)} className="button is-danger">Delete Job</button>
                            <button onClick={closeModal} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>


    )
}

export default DetailsList