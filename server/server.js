import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', userRoutes)
app.use("/api/income",incomeRoutes)

connectDB()
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})