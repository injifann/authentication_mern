import express, { json } from 'express';
import dotenv from 'dotenv'
import  connectDB from './config/db.js';
import authRouter from './route/route.js' 

dotenv.config();
const app=express();
app.use(json());
app.use("/api/user",authRouter);


const port=process.env.PORT;

connectDB()

app.listen(port,()=>{
    console.log("app is listening on",port,"port");
})