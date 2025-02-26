const express = require("express");
const auth = require("../middlewares/auth");
const { getConversation, conversations, conversationDetailes } = require("../controllers/conversation.controller");

const conversationsRouter = express.Router();

conversationsRouter.post("/", auth, getConversation);
conversationsRouter.get("/conversations",auth, conversations);
// conversationsRouter.get("/:username",auth, conversationDetailes);

module.exports = conversationsRouter;