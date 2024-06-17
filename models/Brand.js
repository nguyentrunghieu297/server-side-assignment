const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
