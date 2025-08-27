import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new mongoose.Schema({
videoFile:{
    type:String, // url from cloudinary 
    required: true,
},
thumbnail:{
    type:String, // url from cloudinary 
    required: true,
},
title:{
    type:String, 
    required: true,
},
discription:{
    type:String, 
    required: true,
},
duration:{
    type:Number, //  from cloudinary 
    required: true,
},
views:{
    type:Number, 
    default: 0
},
ispublished:{
    type:Boolean, 
    default:true
},
owner:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"User"
},

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video",videoSchema)