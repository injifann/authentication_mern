import User from "../models/user.js";
import jwt from 'jsonwebtoken'

const protect =async(req,res,next)=>
    {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            try
            {
              let token=req.headers.authorization.split(" ")[1];
              const decoded= jwt.verify(token,process.env.JWT_SECRET);
              req.user = await User.findById(decoded.id).select("-password");
              return next();
            
            }
            catch(error)
            {
             console.log(error);
              return res.status(401).json({message:"Not authorized,Token failed"});
            }
        }
        res.status(401).json({message:"Not authorized,Token failed"});

}

export default protect