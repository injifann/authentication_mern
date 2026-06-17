import express, { json } from 'express';
import dotenv from 'dotenv'
import  connectDB from './config/db.js';
import authRouter from './route/route.js' 
import cors from 'cors'

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/user",authRouter);


const port=process.env.PORT;

connectDB()

app.listen(port,()=>{
    console.log("app is listening on",port,"port");
})