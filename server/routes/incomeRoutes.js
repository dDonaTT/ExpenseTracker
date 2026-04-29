import express from 'express'
import { getIncome, createIncome, updateIncome, deleteIncome } from '../controllers/incomeController.js'
import authMiddleware from '../middleware/auth.js'

const incomeRoutes = express.Router()

incomeRoutes.get('/', authMiddleware, getIncome)
incomeRoutes.post('/', authMiddleware, createIncome)
incomeRoutes.put('/:id', authMiddleware, updateIncome)
incomeRoutes.delete('/:id', authMiddleware, deleteIncome)

export default incomeRoutes