import express from "express";
import { getMsgForConversation } from "../controller/msgController";

const conversation_router = express.Router();

conversation_router.get('/',getMsgForConversation)

export default conversation_router;