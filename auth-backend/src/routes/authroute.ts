import express from "express";
import { signup } from "../controllers/authcontrollet";

const auth_router = express.Router();

auth_router.post('/signup',signup)

export default auth_router;