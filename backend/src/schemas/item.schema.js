import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { required: true, type: String },
  excerpt: { required: true, type: String },
  description: { required: true, type: String },
  is_on_homepage: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["published", "archive", "draft"],
    default: "published",
  },
  date_at: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
  category_id: { type: mongoose.Schema.Types.ObjectID, ref: "Category" },
  tags: { type: [mongoose.Schema.Types.ObjectID], ref: "Tag", default: [] },
  image: { type: String },
});

export const itemModel = mongoose.model("Item", itemSchema);
