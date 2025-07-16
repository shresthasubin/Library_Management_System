import express from 'express'
import { addBook, getAllBook, getBook, updateBook, deleteBook } from '../controllers/book.controllers.js'
import { authenticateToken, isLibrarian } from '../middlewares/authentiacation.middleware.js'
import upload from '../utility/uploadImage.utility.js'

const router_book = express.Router()

router_book.post('/add', authenticateToken, isLibrarian(['librarian']), upload.single('bookImage'), addBook)
router_book.get('/', authenticateToken, isLibrarian(['librarian']), getAllBook)
router_book.get('/:name', authenticateToken, isLibrarian(['librarian']), getBook)
router_book.post('/:id', authenticateToken, isLibrarian(['librarian']), updateBook)
router_book.post('/:id', authenticateToken, isLibrarian(['librarian']), deleteBook)

export { router_book }