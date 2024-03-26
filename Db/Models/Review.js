import { Schema, model } from "mongoose";


const schema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    attraction:{
        type:Schema.Types.ObjectId,
        ref:"attraction",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

export const reviewCollection=model.review||model("review",schema)