const User = require("../models/User")
const bcrypt = require('bcrypt');

const Register = async (req,res) => {
    const  { username = null ,email = null, password = null } = req.body

    /* validate request */
    if(!username || !email || !password){
        return res.json({ success :false, message:"all fields (username,email & password) are required" })
    }

    /* proccess request */
    try {
      

        /* check user uniqe */
        const userExist = await User.findOne({email})
        console.log('userex = ',userExist)
        if(userExist){
            return res.json({ success:false , message:"Email Alredy Exists "})
        }

        const hashed_password =  await bcrypt.hash(password,10)

        const user = new User({
            username ,email ,password:hashed_password
        })

        var result = await user.save()
        return res.json({ success : true , result :result })

    } catch (error) {
        return res.json({ success :false, message:error.message})
    }

  



}


module.exports = { Register }