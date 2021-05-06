import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

function DetailsList(props) {

    const job = props.job
    const tasks = props.tasks

    const [task, setTask] = useState({ taskItem: '' }) // This is a new 'task'
    const [isModalActive, setisModalActive] = useState(false)

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
                <span onClick={() => handleDeleteTask()} className="tag is-dark is-small">X</span>
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

    return (
        <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-title is-flex is-flex-direction-column">
                            <p className="title">{job.companyTitle}</p>
                            <p className="subtitle">{job.jobTitle}</p>
                            <a className="subtitle" href={job.companyURL} target="_blank" rel="noreferrer">Company's Website</a>
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
                        <a className="subtitle" href={job.jobURL} target="_blank" rel="noreferrer">Job Posting</a>
                        <p className="subtitle">{job.jobURL}</p>
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
                        <h2>Are you sure you want to delete your application for {job.jobTitle} at {job.companyTitle}?</h2><br/>
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