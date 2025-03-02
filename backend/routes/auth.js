import express from "express";
import { Register, Login, LogOut, SendEmailVerification, RequestEmailVerification, ForgetPassword, ResetPassword, SearchUser } from "../controllers/auth.js";
import {auth} from "../middlewares/auth.js";
import { multerUpload } from "../config/multer.js";

const authRouter = express.Router()
/* 
apiRouter.post('/register',(req,res)=>{ console.log('register called checked') })
 */
authRouter.post('/register', multerUpload.single("profile"), Register)
authRouter.post('/login', Login)
authRouter.post('/logout', LogOut)
authRouter.get('/send-email-verification', auth, SendEmailVerification)
authRouter.post('/verify-account', auth, RequestEmailVerification)
authRouter.post('/forget-password', ForgetPassword)
authRouter.post('/reset-password', ResetPassword)
authRouter.post('/search', SearchUser)

export { authRouter} 