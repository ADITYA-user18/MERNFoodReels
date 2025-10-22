import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const URI = process.env.MONGO_URI


const DBConnect = ()=>{
    mongoose.connect(URI)
.then(()=> console.log('Connected to Database successfully'))
.catch((error)=> console.log('Failed to connect to Database',error))
}


export default  DBConnect;