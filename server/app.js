const express = require('express')
const app = express() 
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authenticate = require('./authMiddleware')
require('dotenv').config()

// Schema
const User = require('./schemas/user')
const Job = require('./schemas/job')
const Task = require('./schemas/task')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://wezrine:alexander@cluster0.nxus8.mongodb.net/JobTracker?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB Database')
    } else {
        console.log(error)
    }
})

app.get('/jobs', authenticate, (req, res) => {
    Job.find({}, (error, job) => {
        if(error) {
            res.json({error: 'Unable to get job'})
        } else {
            res.json(job)
        }
    })
})

app.post('/jobs', (req, res) => {
    const companyTitle = req.body.companyTitle
    const status = 'inProgress'
    const companyURL = req.body.companyURL
    const jobTitle = req.body.jobTitle
    const jobURL = req.body.jobURL
    const jobDescription = req.body.jobDescription
    const contactName = req.body.contactName
    const contactRole = req.body.contactRole
    const contactPhone = req.body.contactPhone
    const contactEmail = req.body.contactEmail

    let job = new Job({
        companyTitle: companyTitle,
        status: status,
        companyURL: companyURL,
        jobTitle: jobTitle,
        jobURL: jobURL,
        jobDescription: jobDescription,
        contactName: contactName,
        contactRole: contactRole,
        contactPhone: contactPhone,
        contactEmail: contactEmail
    })

    job.save((error) => {
        if(error) {
            res.json({error: 'Unable to save!'})
        } else {
            res.json({success: true, message: 'Saved new post'})
        }
    })
})

app.put('/jobs', (req, res) => {
    const jobId = req.body.jobId
    const companyTitle = req.body.updatedJob.companyTitle
    const companyURL = req.body.updatedJob.companyURL
    const jobTitle = req.body.updatedJob.jobTitle
    const jobURL = req.body.updatedJob.jobURL
    const jobDescription = req.body.updatedJob.jobDescription
    const contactName = req.body.updatedJob.contactName
    const contactRole = req.body.updatedJob.contactRole
    const contactPhone = req.body.updatedJob.contactPhone
    const contactEmail = req.body.updatedJob.contactEmail

    let updatedJob = {
        companyTitle: companyTitle,
        companyURL: companyURL,
        jobTitle: jobTitle,
        jobURL: jobURL,
        jobDescription: jobDescription,
        contactName: contactName,
        contactRole: contactRole,
        contactPhone: contactPhone,
        contactEmail: contactEmail
    }

    Job.findByIdAndUpdate(jobId, updatedJob, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update'})
        } else {
            res.json({success: true})
        }
    })
})

app.delete('/jobs/:jobId', (req, res) => {

    const jobId = req.params.jobId

    Job.findByIdAndDelete(jobId, (error, result) => {
        if(error) {
            res.json({error: 'Unable to delete'})
        } else {
            console.log(result)
            res.json({success: true})
        }
    })

})

app.put('/status', (req, res) => {

    const jobId = req.body.jobId
    const status = req.body.status
    
    let updatedJob = {
        status: status
    }

    Job.findByIdAndUpdate(jobId, updatedJob, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update'})
        } else {
            res.json({success: true})
        }
    })
})

app.post('/tasks', (req, res) => {

    const jobId = req.body.task.jobId
    const taskItem = req.body.task.taskItem
    const isCompleted = false

    const task = new Task({
        taskItem: taskItem,
        isCompleted: isCompleted
    })

    Job.findById(jobId, (error, job) => {
        if(error) {
            res.json({error: 'Unable to find job'})
        } else {
            job.tasks.push(task)
            job.save(error => {
                if(error) {
                    res.json({error: "unable to save task"})
                } else {
                    res.json({success: true, message: 'Task has been saved!'})
                }
            })
        }
    })
})

app.put('/tasks/:jobId/:taskId', (req, res) => {
    const jobId = req.params.jobId
    const taskId = req.params.taskId
    const updatedStatus = req.body.updatedStatus

    Job.findOneAndUpdate(
        {'_id': jobId, 'tasks._id': taskId},
        {
            '$set': {
                'tasks.$.isCompleted': updatedStatus
            }
        },
        function (error, doc) {
            console.log(error)
        }
    )
})

app.delete('/tasks/:jobId/:taskId', (req, res) => {
    const jobId = req.params.jobId
    const taskId = req.params.taskId

    Job.findOneAndDelete(
        {'_id': jobId, 'tasks._id': taskId},
        function (error, doc) {
            if (error) {
                console.log(error)
            } else {
                console.log(doc)
            }
        }
    )
})

app.get('/details/:jobId', (req, res) => {
    const jobId = req.params.jobId

    Job.findById(jobId, ((error, job) => {
        if(error) {
            res.json({error: 'Unable to get job'})
        } else {
            res.json(job)
        }
    }))
})

app.post('/register', (req, res) => {
    
    const username = req.body.username
    const password = req.body.password

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if (!error) {
                let user = new User({
                    username: username,
                    password: hash
                })
                user.save().then((registeredUser) => {
                    console.log(registeredUser)
                    res.send('Registered')
                })
            }
        })
    })
})

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    User.findOne({
        username: username
    }).then((user) => {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                const token = jwt.sign({ username: username }, process.env.JWT_KEY)
                res.json({success: true, token: token, username: username})
            } else {
                res.json({success: false})
            }
        })
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})