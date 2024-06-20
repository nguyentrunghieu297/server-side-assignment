const mongoose = require('mongoose');
const Brand = require('./Brand');
const commentSchema = require('./Comment');

const watchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Watch', watchSchema);
