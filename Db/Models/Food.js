import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    desc: String,
    ingredients:[{type:String}],
    country:{
        type: Schema.Types.ObjectId,
        ref: "country"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    // wikipedia or other website for more information about the food
    url: String
})

export const FoodCollection = model.food || model("food", schema);
