const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);
