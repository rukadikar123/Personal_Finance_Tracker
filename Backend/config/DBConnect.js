import mongoose from "mongoose";

// Function to connect to MongoDB
export const dBConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoDbURI);
    console.log("mongoDb connected successfully");
    
  } catch (error) {
    console.log("mongoDB error", error);
  }
};
