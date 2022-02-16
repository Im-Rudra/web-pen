const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
