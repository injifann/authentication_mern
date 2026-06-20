
import express from 'express'
import protect from '../middleware/protect.js';
import {getMe,Registerauth,Loginauth,googleAuth} from '../controllers/auth.js'


const router=express.Router();

router.post("/login",Loginauth);
router.post("/register",Registerauth);
router.post("/googleAuth",googleAuth)
router.get("/me",protect,getMe);


export default router