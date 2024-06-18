const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true, min: 6, max: 20 },
    password: { type: String, require: true, min: 6 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
