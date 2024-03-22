const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    cast: [String],
    duration: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0 // You can set default value to 0 and update it later
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User' // Reference to user who created the review
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String
        }
      }
    ],
    imageUrl: String,
    trailerUrl: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  export const MovieCollection=model.Movie||model("Movie",movieSchema)