import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,

  },
  image: {
    path: {
      type: String,
    },
    public_id: {
      type: String,
    }
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country"
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  isDeleted:{
    type:Boolean,
    default:false
}
});

export const StateCollection = model.state || model("state", schema);