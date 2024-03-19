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
    // wikipedia or other website for more information about the food
    url: String
})

export const foodCollection = model.food || model("food", schema);
