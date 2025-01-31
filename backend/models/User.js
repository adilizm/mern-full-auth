const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cretedAt:{
        type: Date,
        default: Date.now(),
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:'',
    },
    otpExpairedAt:{
        type:Date,
        default:null
    }
})

module.exports = new mongoose.model('user',userSchema)