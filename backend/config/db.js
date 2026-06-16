import mongoose from "mongoose";

const connectDB = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo db succesfully connected")
    }
    catch(error){
        console.log("Failed to connect to db",error.message);
        process.exit(1);

    }
}

export default connectDB;