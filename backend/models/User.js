import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cretedAt: {
        type: Date,
        default: Date.now(),
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: '',
    },
    verificationCodeExpairedAt: {
        type: Date,
        default: null
    },
    profile: {
        type: String,
        default: null
    }
})

const User = new mongoose.model('user', userSchema)
export { User }