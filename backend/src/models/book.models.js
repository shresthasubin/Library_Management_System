import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    author: {
        type: String,
        trim: true,
        default: 'unknown'
    },
    isbn: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 1
    },
    available: {
        type: Number,
        min: 0
    },
    bookImage: {
        type: String,
        default: ""
    }
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
export default Book