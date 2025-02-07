const User = require("../models/User")
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const WellcomeEmailJob = require("../jobs/wellcomeEmailJob");
const SendEmailVerificationJob = require("../jobs/sendEmailVerification");
const SendEmailPasswordResetJob = require("../jobs/forgetPasswordEmail");

const Register = async (req, res) => {
    const { username = null, email = null, password = null } = req.body

    /* validate request */
    if (!username || !email || !password) {
        return res.json({ success: false, message: "all fields (username,email & password) are required" })
    }

    /* proccess request */
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.json({ success: false, message: "Email Alredy Exists " })
        }

        const hashed_password = await bcrypt.hash(password, 10)

        const user = new User({
            username, email, password: hashed_password
        })

        var result = await user.save()

        /* genirate json web tocken */
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7 days" });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        })

        await WellcomeEmailJob(email, username);

        return res.json({ success: true, result: result })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
const Login = async (req, res) => {
    const { email = null, password = null } = req.body

    /* validate request */
    if (!password || !email) {
        return res.json({ success: false, message: "Email and password  are required " })
    }
    /* proccess request */
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Password incorrect" })
        }

        /* genirate json web tocken */
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7 days" });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        })

        res.json({ success: true })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const LogOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production"
        })

        res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

const SendEmailVerification = async (req, res) => {
    try {
        const VERIFICATION_CODE = Math.floor(100000 + Math.random() * 900000);
        var user = await User.findById(req.user_id);
        user.verificationCode = VERIFICATION_CODE;
        user.verificationCodeExpairedAt = Date.now() + 24 * 60 * 60 * 1000;
        user.save();
        SendEmailVerificationJob(user.email, user.username, VERIFICATION_CODE);
        return res.json({ success: true, message: "verification email has been sent" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

const RequestEmailVerification = async (req, res) => {
    var user = await User.findById(req.user_id);
    const { verification_code } = req.body;

    if (!verification_code) {
        return res.json({ success: false, message: "Verification code is required" })
    }

    if (Date.now() > user.verificationCodeExpairedAt) {
        return res.json({ success: false, message: "Verification code expired" })
    }

    try {

        if (verification_code != user.verificationCode) {
            return res.json({ success: false, message: "Verification code is not valide" })
        } else {
            user.verification_code = "";
            user.verificationCodeExpairedAt = "";
            user.isVerified = true;
            user.save()
            return res.json({ success: true, message: "user verified" })
        }

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }

}

const ForgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email required" })
    }

    var user = await User.findOne({ email });

    if (!user) {
        return res.json({ success: true, message: "if Email exist you will recive reset Code in your email" }); // for security i will not give info if the email exist or not in the db 
    }

    try {
        const VERIFICATION_CODE = Math.floor(100000 + Math.random() * 900000);
        user.verificationCode = VERIFICATION_CODE;
        user.verificationCodeExpairedAt = Date.now() + 10 * 60 * 60 * 1000;// expaire in 10 min; 
        user.save();
        SendEmailPasswordResetJob(user.email, user.username, VERIFICATION_CODE);
        return res.json({ success: true, message: "if Email exist you will recive reset Code in your email" }); // for security i will not give info if the email exist or not in the db 


    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}

const ResetPassword = async (req, res) => {
    const { verification_code, email, new_password, new_password_confirmation } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email required" })
    }

    var user = await User.findOne({ email });

    if (!user) {
        return res.json({ success: false, message: "user not recognized" });
    }

    try {

        if (new_password != new_password_confirmation) {
            return res.json({ success: false, message: "password must be confirmed" });
        }

        if (user.verificationCode != verification_code) {
            return res.json({ success: false, message: "incorect code " });
        }

        if (user.verificationCodeExpairedAt < Date.now()) {
            return res.json({ success: false, message: "code expired " });
        }

        user.verificationCode = "";
        user.verificationCodeExpairedAt = null;
        const hashed_password = await bcrypt.hash(new_password, 10);
        user.password = hashed_password;
        user.save();
        return res.json({ success: true, message: "Password changed" });
    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}

module.exports = { Register, Login, LogOut, SendEmailVerification, RequestEmailVerification, ForgetPassword, ResetPassword }