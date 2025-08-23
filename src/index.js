import dotenv from 'dotenv';
dotenv.config();


import connectDB from './db/index.js'

connectDB()



/*
(async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    }
    catch(err){
        console.error("ERROR",err)
        throw err
    }
})
*/