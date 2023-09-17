const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        shortDesc: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.UTC
        }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);