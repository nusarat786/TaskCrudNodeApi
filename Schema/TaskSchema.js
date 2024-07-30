const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique:true
        
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        enum: ["Pending", "Completed"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null,
    }

});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
