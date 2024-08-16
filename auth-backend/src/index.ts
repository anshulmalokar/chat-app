import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth_router from "./routes/authroute";
import connection from "./db/dbConnect";
dotenv.config();
const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',auth_router);
app.get('/',(req,res)=>{
    return res.status(200).json({
        msg: "Auth Service Working Fine"
    }); 
});
app.listen(PORT,() => {
    connection();
    console.log(`The Server started at the PORT ${PORT}`);
});