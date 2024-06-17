const mongoose = require('mongoose');

const brandSchema = new Schema({ brandName: String }, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
