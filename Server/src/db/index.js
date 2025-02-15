import mongoose from "mongoose";

export const connectDB = async() => {
       try {
             const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}/${process.env.DB_NAME}`) 
             return connectionInstance
       } catch (error) {
              console.error("error :  ",error)
              throw error
       }
}