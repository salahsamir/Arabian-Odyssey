import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  attractions: {
    type: Schema.Types.ObjectId,
    ref: "attraction"
  },
  isDeleted:{
    type:Boolean,
    default:false
}
});

export const stateCollection = model.state || model("state", schema);