import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlength:[4,"user name must be at least 4 character"],
        maxlength:[20,"user length cannot be more than 20 character"]
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[4,"password must be at least 4 character"],
        maxlength:[30,"password length cannot be longer than 30"]
    }
},{timestamps:true});


userSchema.pre("save",async function (next){
    if(!this.isModified("password"))
    {
        return next()
    }
    try
    { const salt= await bcrypt.genSalt(10);
      this.password=await bcrypt.hash(this.password,salt);
      next()

    }
    catch(error)
    {
        next(error);
    }
})
userSchema.methods.checkPassword= async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}

const user=mongoose.model("user",userSchema);
export default user