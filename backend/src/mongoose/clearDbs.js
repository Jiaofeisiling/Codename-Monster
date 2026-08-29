import mongoose from "mongoose";
import { dbConnect } from "./index.js";

import { userModel } from "../schemas/user.schema.js";
import { roleModel } from "../schemas/role.schema.js";
import { permissionModel } from "../schemas/permission.schema.js";
import { tagModel } from "../schemas/tag.schema.js";
import { categoryModel } from "../schemas/category.schema.js";
import { itemModel } from "../schemas/item.schema.js";
import { shopModel } from "../schemas/home.schema.js";
import { productModel } from "../schemas/home.schema.js";
import { transactionModel } from "../schemas/home.schema.js";

export async function clear() {
  dbConnect();
  await roleModel.deleteMany({});
  await permissionModel.deleteMany({});
  await userModel.deleteMany({});
  await tagModel.deleteMany({});
  await categoryModel.deleteMany({});
  await itemModel.deleteMany({});
  await shopModel.deleteMany({});
  await productModel.deleteMany({});
  await transactionModel.deleteMany({});

  console.log("DB cleared");
}

clear().then(() => {
  mongoose.connection.close();
});

