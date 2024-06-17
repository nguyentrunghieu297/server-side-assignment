const mongoose = require('mongoose');
const Brand = require('./Brand');

const watchSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Watch', watchSchema);
