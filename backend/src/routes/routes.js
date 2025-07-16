import { router_user } from "./user.routes.js";
import { router_auth } from "./auth.routes.js";
import { router_book } from "./book.routes.js";
import { router_borrow } from "./borrow.routes.js";

import express from 'express'

const router = express.Router()
router.use('/auth',router_auth)
router.use('/user',router_user)
router.use('/book',router_book)
router.use('/book',router_borrow)

export {router}