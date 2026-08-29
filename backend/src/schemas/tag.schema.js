import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { required: true, type: String },
  color: { required: true, type: String },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", default: [] }],
  created_at: { type: Date },
  updated_at: { type: Date },
});

tagSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

tagSchema.set("toJSON", { virtuals: true });

export const tagModel = mongoose.model("Tag", tagSchema);