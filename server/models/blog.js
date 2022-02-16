const mongoose = require('mongoose');
const { Schema, model, ObjectId } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    authorId: { type: ObjectId, required: true },
    categoryId: { type: ObjectId, required: true }
  },
  { timestamps: true }
);

module.exports = model('Blog', blogSchema);
