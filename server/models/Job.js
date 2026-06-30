const mongoose = require('mongoose')

const { Schema } = mongoose

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    budgetType: {
        type: String,
        enum: ['fixed', 'hourly'],
        default: 'fixed'
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in_review', 'in_progress', 'completed'],
        default: 'open'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    aiMatchingEnabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema)
module.exports = Job