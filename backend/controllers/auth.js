import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library';

const client= new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const googleAuth=async(req,res)=>
{
    const {token}=req.body;
    try
    {
       const ticket=await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID,  })

       const payload=ticket.getPayload();
       const {sub,email,name}=payload;

        let user=await User.findOne({email});


       if(!user)
        {
            user= await User.create({
                userName:name || email.split('@')[0],
                email:email,
                googleId:sub,
                isVerified:true,

            })

            const appToken=generateToken(user._id);
             return res.status(201).json({message:"google account successfully linked",user,token:appToken});  
        }

        if(user && !user.googleId)
        {
            user.googleId=sub;
            await user.save();
            const appToken=generateToken(user._id);
            return res.status(200).json({message:"google account connected",user,token:appToken});
        }
        
            const appToken=generateToken(user._id);
            return res.status(200).json({message:"successfully logged in with google",user,token:appToken});

    }
    catch(error)
    {
        return res.status(500).json({
            message:"Login failed",
            error:error.message,
    })
}}



export const Loginauth = async (req,res)=>{
    
    const{email,password}=req.body;

    if(!email || !password  )
    {
        return res.status(400).json({message:"Envalid credentials"});
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
      return res.status(400).json({message:"please Enter all fields"});
    }
     try
     {
          const userExist= await User.findOne({email});
          if(userExist)
          {
             return res.status(409).json({message:"User already exist"});
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
    res.status(200).json(req.user)

}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}