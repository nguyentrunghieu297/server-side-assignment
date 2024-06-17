const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./Comment');

const watchSchema = new Schema(
  {
    watchName: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    Automatic: { type: Boolean, default: false },
    watchDescription: { type: String, require: true },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brands',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Watch', watchSchema);
