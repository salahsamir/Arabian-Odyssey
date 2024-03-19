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
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
export const CategoryCollection=model.category||model('category',schema)