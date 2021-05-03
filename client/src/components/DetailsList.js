import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

function DetailsList (props) {

    const job = props.job
    const tasks = props.tasks

    const [task, setTask] = useState({taskItem: ''}) // This is a new 'task'

    const taskItems = tasks.map((task, index) => {
        return (
            <li key={index}><input type="checkbox"/>{task.taskItem}</li>
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

            let newTask = {task}

            props.onNewTask(newTask)
        }  
    }

    return (
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-light is-black">
                                <p className="title">{job.companyTitle}</p>
                                <p className="subtitle">{job.jobTitle}</p>
                                <a className="subtitle" href={job.companyURL} target="_blank" rel="noreferrer">{job.companyURL}</a>
                                <div className='row is-flex is-justify-content-space-between controls'>
                                    <div className="select is-small">
                                        <select>
                                            <option>Accepted</option>
                                            <option>Completed</option>
                                            <option>In Progress</option>
                                            <option>Denied</option>
                                        </select>
                                    </div>
                                    <NavLink to = {`/update-job/${job._id}`}><button className="button is-small">Update</button></NavLink>
                                    <button className="button is-small">Delete</button>
                                    
                                </div> 
                            </article>
                            <article className="tile is-child notification is-info">
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
                            <div className="content">
                                <ul>
                                    {taskItems ? taskItems : <h3>Loading...</h3>}
                                </ul>
                                <div className="is-flex-direction-row checklist-input">
                                    <input onChange={handleOnChange} name="taskItem" className="input" type="text" placeholder="Add a task"/>
                                    <button onClick={handleAddTask} className="button is-link" >Add</button>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-dark">
                        <div className="content">
                            <p className="title">Description</p>
                            <p className="subtitle">{job.jobURL}</p>
                            <div className="content">
                                <article className="message description">
                                    <textarea className="message-body" value={job.jobDescription} disabled></textarea>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
    )
}

export default DetailsList