import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { required: true, type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  permissions: [{ type: mongoose.Schema.Types.ObjectID , ref: 'Permission'}],
  users: [{ type: mongoose.Schema.Types.ObjectID , ref: 'User'}],
});

roleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

roleSchema.set("toJSON", { virtuals: true });

export const roleModel = mongoose.model("Role", roleSchema);
