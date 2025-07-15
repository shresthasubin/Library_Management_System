import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
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
        default: 0
    },
    available: {
        type: Number
    }
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
export default Book