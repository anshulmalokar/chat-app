import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("CONNECTION ESTABLISHED");
        return connection;
    }catch(e){
        console.log("ERROR THE CONNECTION FAILED");
    }
}

export default connection;