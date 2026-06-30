const mongoose = require('mongoose')
const { Schema } = mongoose
const applicationSchema = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending_review', 'accepted', 'rejected'],
        default: 'pending_review'
    },
    proposedRate: {
        type: Number,
    }
}, { timestamps: true })

const Application = mongoose.model('Application', applicationSchema)
module.exports = Application