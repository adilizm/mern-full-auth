const JWT = require('jsonwebtoken')

const auth = async (req,res,next)=>{ 
    const { token } = req.cookies

    if(!token){
        return res.json({success : false, message:"Unauthorized . Login to continue"});
    }
    
    try {
        const user_id = JWT.verify(token,process.env.JWT_SECRET).id;
        if(!user_id){
            return res.json({success : false, message:"Unauthorized . Login to continue"});
        }
        
        req.user_id = user_id;
        console.log("user_ID = ",user_id);
    } catch (error) {
        return res.json({success : false, message:error.message});
    }

    next()
    
}

module.exports = auth