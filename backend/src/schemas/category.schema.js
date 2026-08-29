import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { required: true, type: String },
  description: { required: true, type: String },
  items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item", default: []}],
  created_at: { type: Date },
  updated_at: { type: Date },
});

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", { virtuals: true });

export const categoryModel = mongoose.model("Category", categorySchema);