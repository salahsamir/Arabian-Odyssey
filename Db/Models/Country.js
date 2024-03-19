import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    flag: {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    image: {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    desc: String,
    states: [{
        type: Schema.Types.ObjectId,
        ref: "state",
        required: true
    }],
    food: [{
       type: Schema.Types.ObjectId,
       ref: "food" 
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
})

export const countryCollection = model.country || model("country", schema);