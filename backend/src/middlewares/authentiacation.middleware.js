import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(404).json({
                success: false,
                message: 'token not found'
            })
        }

        const tokenVerify = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = await User.findById(tokenVerify._id
        ).select('-password')
        next()
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'token not found'
        })
    }
}

const isLibrarian = (role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Should be librarian'
            })
        }
        next()
    }
}

export {authenticateToken, isLibrarian}