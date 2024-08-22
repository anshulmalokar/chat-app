import mongoose from "mongoose";

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONOG_DB_URI as string);
        console.log("CONNECTION ESTABLISHED");
    }catch(e){
        console.log(e);
        console.log("ERROR THE CONNECTION FAILED");
    }
}

export default connection;