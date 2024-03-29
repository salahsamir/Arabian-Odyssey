import { Types } from "mongoose";
import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: [true, "this email is already exist"],
      index: true,
    },
    password: {
      type: String,
      required: true,
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
    birth: {
      day: Number,
      month: Number,
      year: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    image: {
      path: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    phone: { type: String },
    status: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },
    isConfiremed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    Role: {
      type: String,
      enum: ["HR", "Admin", "User"],
      default: "User",
    },
    reset: {
      type: Number,
    },
    WishList: [
      {
        type:Types.ObjectId,
        ref: "attraction",

      }
    ]
  },
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } }
);

schema.virtual("age").get(function () {
  const today = new Date();
  return today.getFullYear() - this.birth.year;
});
schema.virtual("Review", {
  ref: "review",
  localField: "_id",
  foreignField: "user",
});



export const UserCollection = model.user || model("user", schema);