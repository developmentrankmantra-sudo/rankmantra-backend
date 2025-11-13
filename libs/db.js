import mongoose from "mongoose";
 
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        if(conn) {
            console.log("Database connected successfully");
        }
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        
    }
}