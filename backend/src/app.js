import express from 'express';
import  CookieParser from 'cookie-parser';
import UserRoutes from './routes/auth.routes.js';
import foodRoutes from '../src/routes/food.routes.js'
import morgan from "morgan";
import cors from 'cors';

const app  = express()



app.use(cors({
    origin: "http://localhost:5173",  
  credentials: true, 
}));
app.use(express.json());
app.use(CookieParser());
app.use(morgan("dev"));




app.use('/api/user',UserRoutes)
app.use('/api/food',foodRoutes)



app.get('/',(req,res)=>{
    res.status(200).json({message:'Ok i am demo home page and connected correctly'})
});


export default app;