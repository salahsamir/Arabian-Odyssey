import { Schema, model } from "mongoose";

const attractionSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image:{
      path: {
        type: String,
      },
      public_id: {
        type: String,
      }

    },
    images: [
      {
        path: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  
 
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category"
      },
      
    ],
    state: {
      type: Schema.Types.ObjectId,
      ref: "state",
    },
    openingHours: {
      type: String,
    },
    contact: {
      type: String,
    },
    admissionFees: {
      type: String,
    },
    // reviews: [
    //   {
    //     user: {
    //       type: Schema.Types.ObjectId,
    //       ref: "user",
    //       required: true,
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //     },
    //     createdAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);



export const AttractionCollection =
  model.attraction || model("attraction", attractionSchema);
