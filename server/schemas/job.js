const mongoose = require('mongoose')
const Task = require('./task')
const File = require('./file')

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
    tasks: [Task.schema],
    files: [File.schema]
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job