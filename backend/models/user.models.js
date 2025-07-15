import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        enum: ['borrower', 'librarian'],
        lowercase: true,
        default: 'borrower'
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User