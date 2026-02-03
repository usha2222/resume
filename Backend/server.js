import express from 'express'   
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/database.js'
const app = express()
const PORT=process.env.PORT||8000
dotenv.config()

app.use(express.json())
app.use(cors())

connectDb();

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))


