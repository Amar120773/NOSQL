const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    genre: {
      type: [String],
      required: true
    },
    language: {
      type: String,
      enum: ['English', 'Hindi', 'Kannada', 'Telugu', 'Tamil', 'Malayalam'],
      default: 'English'
    },
    director: String,
    cast: [String],
    duration: {
      type: Number,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    poster: String,
    trailer: String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
