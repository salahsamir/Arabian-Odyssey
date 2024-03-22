import { Schema, model } from "mongoose";


const schema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"product",
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