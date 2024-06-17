const mongoose = require('mongoose');

const memberSchema = new Schema(
  {
    memberName: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
