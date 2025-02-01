const express = require("express");
const { Register, Login, LogOut, SendEmailVerification, RequestEmailVerification } = require("../controllers/auth");
const auth = require("../middlewares/auth");

const authRouter = express.Router()

authRouter.post('/register', Register )
authRouter.post('/login', Login )
authRouter.post('/logout', LogOut )
authRouter.get('/send-email-verification',auth, SendEmailVerification )
authRouter.post('/verify-account',auth, RequestEmailVerification )

module.exports = authRouter 