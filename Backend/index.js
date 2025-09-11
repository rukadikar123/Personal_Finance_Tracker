import express from "express"
import dotenv from "dotenv"
import transactionRoutes from "./routes/transaction.routes.js"
import userRoutes from "./routes/user.routes.js"
import { dBConnect } from "./config/DBConnect.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()
dotenv.config()

dBConnect()


// Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


// Routes
app.use("/api/transaction",transactionRoutes)
app.use("/api/auth",userRoutes)



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
    
})