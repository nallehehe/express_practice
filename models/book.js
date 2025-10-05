const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      text: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
