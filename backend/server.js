import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import DBConnect from '../backend/src/db/db.js';
DBConnect();



const server = http.createServer(app)




const port=  process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`server is listening at the port ${port}`)
})