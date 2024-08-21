import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth_router from "./routes/authroute";
import connection from "./db/dbConnect";
import userRouter from "./routes/userrouter";
import cookie_parser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3005;
const app = express();
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000'
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookie_parser());
app.use('/auth',auth_router );
app.use("/users",userRouter);
app.get('/',(req,res)=>{
    return res.status(200).json({
        msg: "Auth Service Working Fine"
    }); 
});
app.listen(PORT,() => {
    connection();
    console.log(`The Server started at the PORT ${PORT}`);
});