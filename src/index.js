import dotenv from 'dotenv';
dotenv.config();

import {app} from './app.js'

import connectDB from './db/index.js'

// calling the function to start db server connectDB from index.js in db folder
connectDB() 
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db failed",err);
})