import express, { json } from "express"
import dotenv from "dotenv"
import tagRouter from "./routes/tagRoutes.js"
import { connectDB } from "./config/dbConnection.js"
dotenv.config()
const app = express()
connectDB()

const port = process.env.PORT

app.use(json())
app.use("/api/tags", tagRouter)


app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})