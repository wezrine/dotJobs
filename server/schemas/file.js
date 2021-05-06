  
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    user: String,
    fileName: String,
    fileURL: String
})

const File = mongoose.model('File', fileSchema)

module.exports = File