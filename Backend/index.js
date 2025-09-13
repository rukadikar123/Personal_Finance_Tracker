import express from "express";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transaction.routes.js";
import userRoutes from "./routes/user.routes.js";
import { dBConnect } from "./config/DBConnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config(); // Load environment variables from .env file

dBConnect(); // Connect to MongoDB

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(
  cors({
    origin: "https://personal-finance-tracker-frontend-13ka.onrender.com", // Allow frontend origin
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies from requests

// Routes
app.use("/api/auth", userRoutes); // Authentication-related routes
app.use("/api/transaction", transactionRoutes); // Transaction-related routes

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
