import { Schema, model } from "mongoose";

const subcategorySchema=new Schema({
    name:{
        type:"string",
        required:[true,"name is required"],
        unique:[true,"name must be unique"],
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:[true,"category is required"]
    },
    ///TODO
    image:{
        type:"string",

    },
    isDeleted:{
        type:"boolean",
        default:false
    }
},{
    timestamps:true
})

export const SubCategoryCollection=model.SubCategory||model("SubCategory",subcategorySchema)