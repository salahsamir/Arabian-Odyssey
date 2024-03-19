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
    capital: String,
    images:[ {
        path: {
            type: String,
        },
        public_id: {
            type: String,
        },
    }],
    desc: String,
    typesOfTourism: [
        {
            type: Schema.Types.ObjectId,
            ref: "category"


        }
    ],
    numoftourist:String,
    bestTimeToVisit:String,
    languages:[{ type:String}],
    isDeleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"

    }
})

export const CountryCollection = model.country || model("country", schema);