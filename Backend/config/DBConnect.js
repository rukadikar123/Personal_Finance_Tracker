import mongoose from "mongoose";

export const dBConnect=async()=>{
    try {
        await mongoose.connect(`${process.env.mongoDbURI}`).then(()=>{
            console.log("mongoDB connected successfully");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}