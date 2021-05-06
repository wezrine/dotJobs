const mongoose = require('mongoose')
const Task = require('./task')

const jobSchema = new mongoose.Schema({
    userId: String,
    companyTitle: String,
    status: String,
    companyURL: String,
    jobTitle: String,
    jobURL: String,
    jobDescription: String,
    contactName: String,
    contactRole: String,
    contactPhone: String,
    contactEmail: String,
    tasks: [Task.schema]
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job