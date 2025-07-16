import express from 'express'
import { register } from '../controllers/user.controllers.js'
import upload from '../utility/uploadImage.utility.js'

const router_user = express.Router()

router_user.post('/register', upload.single('profile'), register)

export {router_user}