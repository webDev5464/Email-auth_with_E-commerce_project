import express, { json, urlencoded } from 'express'
import cors from 'cors'
import dbCon from './configs/dbCon.js'
import { userRouter } from './routes/userRouter.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(urlencoded({ extended: true }), json(), cors(), cookieParser())

app.use("/api", userRouter)

const PORT = 8080
dbCon("mongodb+srv://emailAuth:emailAuth@auth.czsd1.mongodb.net/")
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
