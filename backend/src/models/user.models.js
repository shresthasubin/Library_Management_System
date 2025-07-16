import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        match: [/^[A-Za-z\s\-]+$/, "Please enter valid name without numbers or any other special character"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: [8, 'password must have minimum 8 character']
    },
    role: {
        type: String,
        trim: true,
        enum: ['borrower', 'librarian'],
        lowercase: true,
        default: 'borrower'
    },
    profile: {
        type: String,
        default: ''
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User