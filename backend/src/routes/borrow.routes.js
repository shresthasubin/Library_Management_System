import express from 'express'
import { borrowBook, returnBook } from '../controllers/borrow.controllers.js'
import { authenticateToken, isLibrarian } from '../middlewares/authentiacation.middleware.js'

const router_borrow = express.Router()

router_borrow.get('/borrow', authenticateToken, isLibrarian(['borrower']), borrowBook)
router_borrow.get('/return', authenticateToken, isLibrarian(['borrower']), authenticateToken, returnBook)

export {router_borrow}