import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import db from './db/db.js'
import userRoutes from './routes/userRoutes.js'


const app=express()
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/',userRoutes)
const mongoURL=process.env.mongoURL
db(mongoURL)


try {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }

   