const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['worker', 'client'],
    },
    createdAt: {
        type: Date,
        timestamps: true,
    },
    updatedAt: {
        type: Date,
        timestamps: true,
    },
    profession: {
        type: String
    },
    skills: {
        type: String,
        enum: [],
    },
    experience: {
        type: Number
    },
    hourlyRate: {
        type: Number
    },
    bio: {
        type: String
    },
    rating: {
        type: Number,
        default: 0,
    },
    totalJobs: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

// hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User