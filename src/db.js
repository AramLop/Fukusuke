import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/sushi");
        console.log("Base de dato conectada")
    }   catch (error){
        console.log(error);
    }
};