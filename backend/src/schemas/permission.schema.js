import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: { required: true, type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

permissionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

permissionSchema.set("toJSON", { virtuals: true });

export const permissionModel = mongoose.model("Permission", permissionSchema);
