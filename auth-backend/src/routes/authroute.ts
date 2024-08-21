import express from "express";
import { signup,login } from "../controllers/authcontrollet";

const auth_router = express.Router();

auth_router.post('/signup',signup);
auth_router.post('/login',login);

export default auth_router;