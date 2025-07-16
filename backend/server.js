import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDB from './src/db/index.js'
import { router } from './src/routes/routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import User from './src/models/user.models.js'
import bcrypt, { hash } from 'bcryptjs'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded())
app.use('/uploads', express.static('uploads/'))


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening at: http://localhost:${port}`)
    })
    seedUser()
}).catch(err => {
    console.log('Connection Error: ', err.message)
    throw err
})

async function seedUser () {
    try {
        const user = await User.findOne({email: 'librarian@gmail.com'})
        if (!user) {
            const hashedPassword = await bcrypt.hash('librarian', 10)
            await User.create({
                "name": "librarian",
                "email": "librarian@gmail.com",
                "password": hashedPassword,
                "role": "librarian",
                "profile": ""
            })
        }
    } catch (err) {
        console.log(err.message)
    }
}

app.use('/api', router)

export default app