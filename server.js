import express, { json } from "express"
import dotenv from "dotenv"
import tagRouter from "./routes/tagRoutes.js"
import userRouter from "./routes/user.Rotes.js"
import { connectDB } from "./config/dbConnection.js"
import cors from 'cors'
dotenv.config()
const app = express()
connectDB()

const port = process.env.PORT

app.use(json())
app.use(cors())
app.use("/api/tags", tagRouter)
app.use("/api/user", userRouter)


app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})