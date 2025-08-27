import mongoose from 'mongoose'
import  jwt  from 'jsonwebtoken'
import bcrupt from "bcrypt"


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
},
email:{
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
},
fullname:{
    type:String,
    require:true,
    trim:true,
    index:true,
},
avatar:{
    type:String, // cloudinary url will be used
    require:true,
},
coverImage:{
    type:String, // cloudinary url will be used
},
watchHistory:{ // this will be in array
    type:mongoose.Schema.Types,ObjectId,
    ref:"Video"
},
password:{
    type:String,
    required:[true,"password is required"]
},
refreshToken:{
        type:String
    }
},{timeStamp:true})

  // pre hooks used to do some work just before saving the data  
// in this first we used async in this function because hashing takes time.
// then we in this if only password field is created or updated then only it will hash the password otherwise in updation of email or username etc then it will just go next
// so we used if statement if statement is true means if the password is not updated or created it will just pass (this is what if statement is for used)
// next line after if means if the password is created or updated then the bucript work and password will be hashed

userSchema.pre("save",async function(next){
    if(!this.ismodified("password")) return next();

    this.password = bcrupt.hash(thhis.password,10)
    next()
})

// now the password wil be checked in true or false
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
// password = original password
// this.password = hashed password

userSchema.method.generateAccessToken = function(){
    return jwt.sign({
        _id: thid._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign({
        _id: thid._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }

)
}
userSchema.method,generateRefreshToken = function(){}

export const User = mongoose.model("User",userSchema)