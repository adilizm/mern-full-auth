import express from "express";
import {auth} from "../middlewares/auth.js";
import { getConversation, conversations, conversationDetailes } from "../controllers/conversation.controller.js";

const conversationsRouter = express.Router();

conversationsRouter.post("/", auth, getConversation);
conversationsRouter.get("/conversations", auth, conversations);

export { conversationsRouter };