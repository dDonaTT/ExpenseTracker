import express from 'express'
import { getUser, loginUser, registerUser, updatePassword, updateUser } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/me',authMiddleware, getUser)
userRoutes.put("/profile", authMiddleware,updateUser)
userRoutes.put("/updatepassword",authMiddleware ,updatePassword)

export default userRoutes