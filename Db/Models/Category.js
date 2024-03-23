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
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

schema.virtual("attractions",{
    ref:"attraction",
    localField:"_id",
    foreignField:"category"
})



export const CategoryCollection=model.category||model('category',schema)