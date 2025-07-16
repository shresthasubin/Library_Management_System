import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const user = new User(req.body)
        const userExist = await User.findOne({ email: user.email })

        if (userExist) return res.status(400).json({ message: 'User with email already exist, Try using another email' })

        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword

        if (req.file) {
            user.profile = req.file.filename
        }
        const savedUser = await user.save()

        const {password, ...restDetail} = savedUser.toObject()
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: restDetail           
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Sorry, cannot add members!',
            error: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({ email }).select('+password')

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'Cannot find user with email'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'password incorrect'
            })
        }

        const token = jwt.sign(
            {
                _id: user.id,
                email: user.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3_600_000),
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(201).json({
            success: true,
            message: 'Login successful'
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Cannot login, server failed',
            error: err.message
        })
    }
}

export {register, login}