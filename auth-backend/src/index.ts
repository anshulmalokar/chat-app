import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth_router from "./routes/authroute";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',auth_router);
app.listen(PORT,() => {
    console.log(`The Server started at the PORT ${PORT}`);
})