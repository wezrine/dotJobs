const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskItem: String,
    isCompleted: Boolean
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task