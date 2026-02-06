import express from 'express'   
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/database.js'
import userRouter from './routes/userRouter.js'
import resumeRouter from './routes/resumeRouter.js'
const app = express()
dotenv.config()
const PORT= process.env.PORT || 4000


//Database Connection
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/resumes',resumeRouter)
connectDb();


app.get('/', (req, res) => res.send('Hello World resume!'))

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))
