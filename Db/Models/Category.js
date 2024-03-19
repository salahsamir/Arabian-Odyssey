import { Schema, model } from "mongoose"


const schema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:String,
    image:{
        path:{
            type:String
        },
        public_id:{
            type:String
        }
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
export const CategoryCollection=model.category||model('category',schema)