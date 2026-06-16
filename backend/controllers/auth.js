import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const Loginauth = async (req,res)=>{
    const{email,password}=req.body;
    if(!email || !password  )
    {
        return res.status(401).json({message:"Envalid credentials"});
    }
    try
    {
      const user= await User.findOne({email});
      if(!user || ! (await user.checkPassword(password))){
        return res.status(401).json({message:"Envalid password or email"});
       }
       const token=generateToken(user._id);
       res.status(200).json({user,token});
       
    }

    catch(error)
    {
        res.status(500).json({message:"Internal server Error",error:error.message});
    }
    
}
export const Registerauth =async(req,res)=>

{ 
    const {userName,email,password}=req.body;

    if(!userName || !email || !password)
    {
      return res.status(401).json({message:"please Enter all fields"});
    }
     try
     {
          const userExist= await User.findOne({email});
          if(userExist)
          {
             return res.status(401).json({message:"User already exist"});
          }
          
          const user= await User.create({userName,email,password});
          const token= generateToken(user._id);
          res.status(201).json({user,token});

     }
     catch(error)
     {
       res.status(500).json({message:"Internal Server Error",error:error.message});
     }

}

export const getMe=async(req,res)=>{
    res.status(201).json(req.user)

}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}