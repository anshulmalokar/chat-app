import express from "express";
import { getAllUsers } from "../controllers/usercontroller";
import { verifyToken } from "../middleware/verifyToke";
const userRouter = express.Router();

userRouter.get('/',verifyToken,getAllUsers);

export default userRouter;