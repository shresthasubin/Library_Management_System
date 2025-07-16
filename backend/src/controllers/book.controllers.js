import Book from '../models/book.models.js'

const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body)
        if (req.file) {
            newBook.bookImage = req.file.filename
        }
        await newBook.save()
        res.status(201).json({ message: "Book added successfully" })
    } catch (err) {
        res.status(500).json({ message: 'cannot add book, server error' })
    }
}

const getBook = async (req, res) => {
    try {
        const { name } = req.params
        const book = await Book.findOne({name: name.toLowerCase()})
        if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }
        res.status(201).json({
            message: 'Book found',
            data: book
        })
    } catch {
        res.status(500).json({ message: 'cannot get book, server error' })
    }
}

const getAllBook = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(201).json({
            message: 'List of all available books',
            data: books
        })
    } catch (err) {
        res.status(500).json({message: 'no book found, server crashed!!!'})
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)

        if (!book) {
            return res.status(404).json({
                message: 'cannot delete book, NOT FOUND'
            })
        }

        res.status(201).json({
            message: 'Book deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: 'cannot delete book, Server error',
            error: err.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const {id} = req.params
        const prev_book = await Book.findById(id)
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true})

        if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }

        res.status(201).json({
            message: 'book updated successfully',
            previous_V: prev_book,
            updated_V: book
        })
    } catch (err) {
        res.status(500).json({
            message: 'cannot update book, server error',
            error: err.message
        })
    }
}

export { addBook, getAllBook, getBook, updateBook, deleteBook}