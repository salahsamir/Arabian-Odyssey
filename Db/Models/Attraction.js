import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  desc: String,
  image: {
    path: {
        type: String,
    },
    public_id: {
        type: String,
    },
  },
  location: {
    type: {
        type: "String",
        enum: ["Point"],
        default: "Point",
      },
      cordinates: {
        type: [Number],
      },
  },
  rating: {
    type: Number,
    default: 0,
    required: true
},
raters: {
    type: Number,
    required: true,
    default: 0,
},
category: [{
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
}],
  isDeleted:{
    type:Boolean,
    default:false
}
}, {
    timestamps: true
});

export const attractionCollection = model.attraction || model("attraction", schema);