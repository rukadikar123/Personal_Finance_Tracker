import mongoose from "mongoose";

export const TransactionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },              
    category:{
        type:String,
        enum:['Income', 'Food', 'Rent', 'Travel', 'Bills', 'Shopping', 'Other'],
        required:true
    }
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",TransactionSchema)