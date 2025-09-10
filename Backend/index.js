import express from "express"
import dotenv from "dotenv"
import transactionRoutes from "./routes/transaction.routes.js"
import { dBConnect } from "./config/DBConnect.js"

const app=express()
dotenv.config()

dBConnect()

app.use("/api/transaction",transactionRoutes)


const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
    
})