import express from 'express'
import { login } from '../controllers/user.controllers.js'

const router_auth = express.Router()

router_auth.post('/login', login)
export {router_auth}