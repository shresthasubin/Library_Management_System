import Borrow from '../models/borrow.models.js'
import User from '../models/user.models.js'
import Book from '../models/book.models.js'

const borrowBook = async (req, res) => {
    try {
        const {name, title} = req.body

        const user = await User.findOne({name})
        const book = await Book.findOne({title})

        if (! user) {
            return res.status(404).json({
                success: false,
                message: 'User not found, please register to borrow book'
            })
        }
        if (!book || book.available <= 0) {
            return res.status(400).json({
                success: false,
                message: 'No book available or may be out of stock'
            })
        }

        const borrow = new Borrow({userId: user._id, bookId: book._id, })
        await borrow.save()

        book.available -= 1
        await book.save()

        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully, Thank you!',
            data: borrow
        })


        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed burrowing book',
            error: err.message
        })
    }
}

const returnBook = async (req, res) => {
    try {
        const {name, title} = req.body

        const user = await User.findOne({name})
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found, please register or checkout the field'
            })
        }

        const book = await Book.findOne({title})
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found, book you are trying to return is not registered'
            })
        }

        const borrowedBook = await Borrow.findOne({userId: user._id, bookId: book._id})
        if(!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'you are not registered in borrowed list'
            })
        }

        borrowedBook.returnDate = new Date()
        const updatedBorrow = await borrowedBook.save()

        book.available += 1
        await book.save()

        res.status(200).json({
            success: true,
            message: 'Book returned, Thank you!'
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error returning book, server crash'
        })
    }
}

export {borrowBook, returnBook}